import re
import pandas as pd
from bs4 import BeautifulSoup
from nltk.tokenize import WordPunctTokenizer

from src.settings import CLEAN_DATA


class DataCleaner:
    cols = ['polarity', 'id', 'date', 'query_string', 'user', 'tweet']
    encoding = "ISO-8859-1"

    def __init__(self, filepath):
        self.df = pd.read_csv(filepath, names=self.cols, encoding=self.encoding)
        self.tok = WordPunctTokenizer()
        self.clean_tweets = []
        self.clean_df = None

    def clean(self):
        for i in range(0, self.df.shape[0]):
            self.clean_tweets.append(self._clean(self.df['tweet'][i]))

    def _clean(self, text):
        soup = BeautifulSoup(text, 'lxml')
        souped = soup.get_text()
        r1 = r'@[A-Za-z0-9]+'
        r2 = r'https?://[A-Za-z0-9./]+'
        r = r'|'.join((r1, r2))
        stripped = re.sub(r, '', souped)
        try:
            clean = stripped.decode("utf-8-sig").replace(u"\ufffd", "?")
        except:
            clean = stripped
        letters_only = re.sub("[^a-zA-Z]", " ", clean)
        lower_case = letters_only.lower()
        words = self.tok.tokenize(lower_case)
        return (" ".join(words)).strip()

    def save(self):
        self.clean_df = pd.DataFrame(self.clean_tweets, columns=['tweet'])
        self.clean_df['polarity'] = self.df.polarity
        self.clean_df.to_csv(CLEAN_DATA, encoding='utf-8')

    def get_clean_df(self):
        return self.clean_df
