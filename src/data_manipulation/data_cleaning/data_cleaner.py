import pandas as pd
from nlppreprocess import NLP
from nltk.tokenize import WordPunctTokenizer

from src.settings import CLEAN_DATA
from src.utils import is_english, log, NON_NEGATIVE_STOPWORDS, REPLACEMENTS


def not_empty_or_rt(tweet):
    return tweet.strip() != "" and "rt" not in tweet.lower()


class DataCleaner:
    cols = ['index', 'id', 'tweet', 'user', 'date']

    def __init__(self, filepath):
        self.df = pd.read_csv(filepath, names=self.cols)
        self.tok = WordPunctTokenizer()

    def clean(self):
        log(f"Cleaning raw data - {self.df.shape[0]} tweets")
        obj = NLP()
        obj.add_stopword(NON_NEGATIVE_STOPWORDS)
        obj.add_replacement(REPLACEMENTS)
        mask = self.df['tweet'].apply(is_english)
        self.df = self.df[mask]
        self.df['tweet'] = self.df['tweet'].apply(obj.process)
        mask = self.df['tweet'].apply(not_empty_or_rt)
        self.df = self.df[mask]

    def save(self):
        self.df.to_csv(CLEAN_DATA, encoding='utf-8', index=False)
        log(f"Cleaned data saved - {self.df.shape[0]} tweets")

    def get_clean_df(self):
        return self.df
