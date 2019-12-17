import os

from dotenv import load_dotenv
load_dotenv()

RAW_DATA = "../data/training.1600000.processed.noemoticon.csv"
CLEAN_DATA = "../data/pre_processed/clean_data.csv"
CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')
