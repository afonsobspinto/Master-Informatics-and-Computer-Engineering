import pandas as pd

from src.data_cleaning.data_cleaner import DataCleaner
from src.data_extraction.data_extractor import DataExtractor
from src.settings import RAW_DATA, CLEAN_DATA, EXTRACTED_DATASET

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Profile Anyone')
    parser.add_argument('--user', '-u', dest='user', type=str, action="store", required=True,
                        help='the user to profile')
    args = parser.parse_args()
    user = args.user
    de = DataExtractor(EXTRACTED_DATASET)
    de.extract()
    dc = DataCleaner(RAW_DATA)
    dc.clean()
    # dc.save()
    # clean_df = dc.get_clean_df()
    # clean_df = pd.read_csv(CLEAN_DATA)
    # stats = DatasetStatistics(RAW_DATA)
    # stats.visualise()