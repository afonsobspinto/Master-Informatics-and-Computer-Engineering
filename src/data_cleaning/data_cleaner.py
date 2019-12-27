import re
import pandas as pd
from bs4 import BeautifulSoup
from nltk.tokenize import WordPunctTokenizer
from nlppreprocess import NLP
from src.settings import CLEAN_DATA
from src.utils import is_english, log, NON_NEGATIVE_STOPWORDS


class DataCleaner:
    cols = ['index', 'id', 'tweet', 'user', 'date']

    def __init__(self, filepath):
        self.df = pd.read_csv(filepath, names=self.cols)
        self.tok = WordPunctTokenizer()
        self.clean_df = None

    def clean(self):
        log("Cleaning")
        obj = NLP()
        obj.add_stopword(NON_NEGATIVE_STOPWORDS)
        mask = self.df['tweet'].apply(is_english)
        self.df = self.df[mask]
        self.df['tweet'] = self.df['tweet'].apply(obj.process)

    def save(self):
        self.df.to_csv(CLEAN_DATA, encoding='utf-8', index=False)

    def get_clean_df(self):
        return self.clean_df
