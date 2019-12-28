import os
from dotenv import load_dotenv
load_dotenv()

DEBUG = True

#RAW_DATA = "../data/dataset.csv"
RAW_DATA = "../data/dataset_small.csv"
CLEAN_DATA = "../data/pre_processed/clean_data.csv"
CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')
WORDCOUNT_IMG = "../data/pre_processed/wordcount_img.png"
TOP_WORDS_IMG = "../data/pre_processed/topwordst_img.png"
PRE_PROCESSED = "../data/pre_processed/"
MALLET_PATH = "../libraries/mallet-2.0.8/bin/mallet"


# DEV

EXTRACTED_DATASETS = "../../data/extracted"
COMBINED_DATASET = "../../data/dataset.csv"
KEY_WORDS = "../../data/related_words/"
RELATED_WORDS = "../data/related_words/related_words.txt"
TOPICS = {
    "abortion.txt": True,
    "animals.txt": True,
    "artificial_intelligence.txt": True,
    "blockchain.txt": True,
    "brexit.txt": True,
    "donald_trump.txt": True,
    "feminism.txt": True,
    "movies.txt": True,
    "music.txt": True,
    "politics.txt": True,
    "pope.txt": False,
    "racism.txt": True,
    "refugee.txt": True,
    "ufc.txt": True,
}
