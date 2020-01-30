import pandas as pd

from data_extraction.data_extractor import DataExtractor
from data_manipulation.data_analyser import DataAnalyser
from data_manipulation.data_cleaning.data_cleaner import DataCleaner
from scripts.generate_small_dataset import generate_dataset
from sentiment_analysis.SentimentAnalysis import SentimentAnalysis
from settings import CLEAN_DATA, PHASE, USE_LAST_PARAMS, PARAMS_PATH, MAX_LENGTH, SMALL_COMBINED_DATASET
from topic_classifier.topic_classifier import TopicClassifier
from topic_modeling.labelling import Labelling
from topic_modeling.topic_modeling import TopicModeling
from utils import dump_json, read_json, log


def profile_any_one(phases, rows, user):

    params = {}
    last_params = read_json(PARAMS_PATH)

    # Generate minimun dataset
    if rows > MAX_LENGTH:
        rows = MAX_LENGTH

    generate_dataset(rows)

    raw_data = SMALL_COMBINED_DATASET

    # Extracts tweets and saves them in a csv file
    if phases['extractor']:
        log("Extracting")
        de = DataExtractor(raw_data)
        de.extract()
        de.save()


    # Extracts user tweets
    if phases["user"]:
        log("Extracting User Tweets")
        if not phases['extractor']:
            de = DataExtractor(raw_data)
        de.get_user_en_tweets(user)

    # Cleans dataset and saves them in a csv file
    if phases['cleaner']:
        log("Cleaning")
        dc = DataCleaner(raw_data)
        dc.clean()
        dc.save()
        clean_df = dc.get_clean_df()
    else:
        clean_df = pd.read_csv(CLEAN_DATA)

    # Analyses dataset
    if phases['analyser']:
        log("Analysing")
        da = DataAnalyser(clean_df)
        da.analyse()

    # topic modeling using LDA’s approach
    if phases['modeller']:
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

    if phases['labelling']:
        log("Labelling")
        if phases['modeller']:
            labelling = Labelling(df_topic_keywords=tm.get_topic_keywords_table(), filepath=tm.save_path)
        elif USE_LAST_PARAMS:
            labelling = Labelling(filepath=last_params['last_path'])
        else:
            raise Exception("Invalid Settings")
        labelling.automatic_label()
        labelling.save()

    if phases['classifier']:
        log("Classifying")
        if phases['labelling']:
            tc = TopicClassifier(df_data=labelling.df_topic_keywords)
        elif USE_LAST_PARAMS:
            tc = TopicClassifier(df_path=last_params['last_path'])
        else:
            raise Exception("Invalid Settings")
        tc.classify(algorithm="gbc")
        params['estimator'] = f'{tc.save_path}/best_estimator.pickle'

    if phases['sentiment']:
        log("Sentiment Analysis")
        if phases["user"]:
            if phases['labelling']:
                sa = SentimentAnalysis(de.user_tweet_ids, df_data=labelling.df_topic_keywords)
            elif USE_LAST_PARAMS:
                sa = SentimentAnalysis(de.user_tweet_ids, df_path=last_params['last_path'])
            else:
                raise Exception("Invalid Settings")
        sa.analyse()
        sa.save(user)

    params = {**last_params, **params}
    dump_json(PARAMS_PATH, params)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Profile Anyone')
    parser.add_argument('--user', '-u', dest='user', type=str, action="store", required=True,
                        help='the user to profile')
    parser.add_argument('--dataset', '-d', dest='dataset', type=str, action="store", required=True,
                        help='the path to the csv dataset to use')
    args = parser.parse_args()
    user_arg = args.user
    raw_data_arg = args.dataset
    profile_any_one(PHASE, 1000, user_arg)
