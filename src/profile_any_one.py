import json

import pandas as pd

from data_extraction.data_extractor import DataExtractor
from data_manipulation.data_analyser import DataAnalyser
from data_manipulation.data_cleaning.data_cleaner import DataCleaner
from settings import CLEAN_DATA, RAW_DATA, PHASE, USE_LAST_PARAMS, PARAMS_PATH
from topic_classifier.topic_classifier import TopicClassifier
from topic_modeling.labelling import Labelling
from topic_modeling.topic_modeling import TopicModeling
from utils import dump_json, read_json, log

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Profile Anyone')
    parser.add_argument('--user', '-u', dest='user', type=str, action="store", required=True,
                        help='the user to profile')
    parser.add_argument('--dataset', '-d', dest='dataset', type=str, action="store", required=True,
                        help='the path to the csv dataset to use')
    args = parser.parse_args()
    user = args.user
    raw_data = args.dataset

    params = {}

    last_params = read_json(PARAMS_PATH)

    # Extracts tweets and saves them in a csv file
    if PHASE['extractor']:
        log("Extracting")
        de = DataExtractor(RAW_DATA)
        de.extract()
        de.save()

    # Cleans dataset and saves them in a csv file
    if PHASE['cleaner']:
        log("Cleaning")
        dc = DataCleaner(raw_data)
        dc.clean()
        dc.save()
        clean_df = dc.get_clean_df()

    else:
        clean_df = pd.read_csv(CLEAN_DATA)

    # Analyses dataset
    if PHASE['analyser']:
        # todo: add statistics here
        log("Analysing")
        da = DataAnalyser(clean_df)
        da.analyse()

    # topic modeling using LDA’s approach
    if PHASE['modeller']:
        log("Modelling")
        tm = TopicModeling(clean_df, raw_data)
        if USE_LAST_PARAMS:
            num_topics = last_params['num_topics']
            tm.model(num_topics=num_topics, save=True)
            tm.visualize(num_topics=num_topics)
        else:
            num_topics = tm.compute_best_model(start=20, stop=40, step=2)
            params['num_topics'] = num_topics
        tm.save_dominant_topics_per_sentence()
        params['last_path'] = tm.save_path
        tm.save_representative_sentence_per_topic()
        tm.save_word_cloud(num_topics)

    if PHASE['labelling']:
        log("Labelling")
        if PHASE['modeller']:
            labelling = Labelling(df_topic_keywords=tm.get_topic_keywords_table(), filepath=tm.save_path)
        elif USE_LAST_PARAMS:
            labelling = Labelling(filepath=last_params['last_path'])
        else:
            raise Exception("Invalid Settings")
        labelling.automatic_label()
        labelling.save()

    if PHASE['classifier']:
        log("Classifying")
        if PHASE['labelling']:
            tc = TopicClassifier(df_data=labelling.df_topic_keywords)
        elif USE_LAST_PARAMS:
            tc = TopicClassifier(df_path=last_params['last_path'])
        else:
            raise Exception("Invalid Settings")
        tc.classify()
        params['estimator'] = f'{tc.save_path}/best_estimator.pickle'

    params = {**last_params, **params}
    dump_json(PARAMS_PATH, params)
