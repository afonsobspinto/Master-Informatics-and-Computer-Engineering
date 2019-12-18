import os

from dotenv import load_dotenv
load_dotenv()

KEY_WORDS = "../../data/related_words/"
RELATED_WORDS = "../data/related_words/related_words.txt"
RAW_DATA = "../data/dataset.csv"
CLEAN_DATA = "../data/pre_processed/clean_data.csv"
CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')

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
