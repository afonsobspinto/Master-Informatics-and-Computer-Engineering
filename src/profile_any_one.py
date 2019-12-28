import pandas as pd

from src.data_manipulation.data_analyser import DataAnalyser
from src.data_manipulation.data_cleaning.data_cleaner import DataCleaner
from src.settings import CLEAN_DATA, RAW_DATA
from src.topic_modeling.topic_modeling import TopicModeling

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Profile Anyone')
    parser.add_argument('--user', '-u', dest='user', type=str, action="store", required=True,
                        help='the user to profile')
    args = parser.parse_args()
    user = args.user

    # Extracts tweets and saves them in a csv file
    # de = DataExtractor(RAW_DATA)
    # de.extract()
    # de.save()

    # Cleans dataset and saves them in a csv file
    # dc = DataCleaner(RAW_DATA)
    # dc.clean()
    # dc.save()
    # clean_df = dc.get_clean_df()

    clean_df = pd.read_csv(CLEAN_DATA)

    # Analyses dataset
    # todo: add statistics here
    # da = DataAnalyser(clean_df)
    # da.analyse()

    # topic modeling using LDA’s approach
    tm = TopicModeling(clean_df)
    tm.analyse()

