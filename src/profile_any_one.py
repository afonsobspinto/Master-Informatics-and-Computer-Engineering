import json

import pandas as pd

from src.data_extraction.data_extractor import DataExtractor
from src.data_manipulation.data_analyser import DataAnalyser
from src.data_manipulation.data_cleaning.data_cleaner import DataCleaner
from src.settings import CLEAN_DATA, RAW_DATA, PHASE, USE_LAST_PARAMS, PARAMS_PATH
from src.topic_modeling.topic_modeling import TopicModeling
from src.utils import dump_json, read_json, log

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Profile Anyone')
    parser.add_argument('--user', '-u', dest='user', type=str, action="store", required=True,
                        help='the user to profile')
    args = parser.parse_args()
    user = args.user

    params = {}

    # Extracts tweets and saves them in a csv file
    if PHASE['extractor']:
        log("Extracting")
        de = DataExtractor(RAW_DATA)
        de.extract()
        de.save()

    # Cleans dataset and saves them in a csv file
    if PHASE['cleaner']:
        log("Cleaning")
        dc = DataCleaner(RAW_DATA)
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
        tm = TopicModeling(clean_df)
        if USE_LAST_PARAMS:
            last_params = read_json(PARAMS_PATH)
            tm.model(num_topics=last_params['num_topics'], save=True)
        else:
            num_topics = tm.compute_best_model(start=20, stop=40, step=2)
            params['num_topics'] = num_topics
        tm.save_dominant_topics_per_sentence()
        tm.save_representative_sentence_per_topic()

    dump_json(PARAMS_PATH, params)
