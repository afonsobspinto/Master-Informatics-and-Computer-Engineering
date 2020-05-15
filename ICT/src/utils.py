import enum
import json
import nltk
from settings import DEBUG
import glob
import os

ENGLISH_STOPWORDS = set(nltk.corpus.stopwords.words('english'))
NON_ENGLISH_STOPWORDS = set(nltk.corpus.stopwords.words()) - ENGLISH_STOPWORDS
STOPWORDS_DICT = {lang: set(nltk.corpus.stopwords.words(lang)) for lang in nltk.corpus.stopwords.fileids()}


class Polarity(enum.Enum):
    POSITIVE = 4
    NEGATIVE = 0


def is_english(tweet_text):
    try:
        tweet_text = tweet_text.lower()
    except:
        return False
    words = set(nltk.wordpunct_tokenize(tweet_text))
    return len(words & ENGLISH_STOPWORDS) > len(words & NON_ENGLISH_STOPWORDS)


def log(msg):
    if DEBUG:
        print(msg)


NEGATIVE_STOPWORDS = ['not', 'don', "don't", 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn',
                      "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn',
                      "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't",
                      'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

NON_NEGATIVE_STOPWORDS = list(ENGLISH_STOPWORDS - set(NEGATIVE_STOPWORDS))

REPLACEMENTS = [
    ("I'm", 'I am'),
    ("=", 'equal'),
    ("&amp;", ' '),
]


def dump_json(filepath, obj):
    with open(filepath, 'w') as json_file:
        json.dump(obj, json_file)


def read_json(filepath):
    with open(filepath) as f:
        data = json.load(f)
    return data


def latest_file(path, extension):
    latest_folder = max([os.path.join(path, d) for d in os.listdir(path)], key=os.path.getmtime)
    list_of_files = glob.glob(latest_folder + '/*.' + extension)  # * means all if need specific format then *.csv
    file = max(list_of_files, key=os.path.getctime)
    return file
