from src.data_cleaning.data_cleaner import DataCleaner
from src.data_extraction.data_extractor import DataExtractor
from src.settings import RAW_DATA, TOPICS

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
    dc = DataCleaner(RAW_DATA)
    dc.clean()
    dc.save()
    # clean_df = dc.get_clean_df()
    # clean_df = pd.read_csv(CLEAN_DATA)
    # stats = DatasetStatistics(RAW_DATA)
    # stats.visualise()