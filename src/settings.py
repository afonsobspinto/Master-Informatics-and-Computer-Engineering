import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = True

RAW_DATA = "data/dataset.csv"
# RAW_DATA = "data/dataset_small.csv"
CLEAN_DATA = "../data/pre_processed/clean_data.csv"
CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')
WORDCOUNT_IMG = "../data/pre_processed/wordcount_img.png"
TOP_WORDS_IMG = "../data/pre_processed/topwords_img.png"
MALLET_PATH = "../libraries/mallet-2.0.8/bin/mallet"

PHASE = {
    "extractor": False,
    "cleaner": False,
    "analyser": False,
    "modeller": False,
    "labelling": False,
    "classifier": True,
}

USE_LAST_PARAMS = True
PARAMS_PATH = "params.json"
MODELS_PATH = "../data/processed/models"
CLASSIFIER_PATH = "../data/processed/classifier/"

# DEV
EXTRACTED_DATASETS = "../../data/extracted"
COMBINED_DATASET = "../../data/dataset.csv"
SMALL_COMBINED_DATASET = "../../data/dataset_small.csv"
SMALL_COMBINED_DATASET2 = "../../data/dataset_small2.csv"
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
    "ufc.txt": False,
}
