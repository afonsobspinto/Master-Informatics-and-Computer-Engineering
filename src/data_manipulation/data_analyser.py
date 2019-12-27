from wordcloud import WordCloud
from src.settings import WORDCOUNT_IMG, TOP_WORDS_IMG
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from src.utils import log


class DataAnalyser:
    def __init__(self, df):
        self.df = df
        self.count_vectorizer = CountVectorizer(stop_words='english', encoding="utf8-sig")
        self.count_data = self.count_vectorizer.fit_transform(self.df['tweet'])

    def wordcloud(self):
        long_string = ','.join(list(self.df['tweet'].values))
        wc = WordCloud(background_color="white", max_words=5000, contour_width=3, contour_color='steelblue')
        wc.generate(long_string)
        wc.to_file(WORDCOUNT_IMG)

    def most_common_words(self, max_words=10):
        words = self.count_vectorizer.get_feature_names()
        if len(words) < max_words:
            max_words = len(words)
        total_counts = np.zeros(len(words))
        for t in self.count_data:
            total_counts += t.toarray()[0]
        count_dict = (zip(words, total_counts))
        count_dict = sorted(count_dict, key=lambda x: x[1], reverse=True)[0:max_words]
        words = [w[0] for w in count_dict]
        counts = [w[1] for w in count_dict]
        x_pos = np.arange(len(words))
        plt.figure(2, figsize=(15, 15 / 1.6180))
        plt.subplot(title=f'{max_words} most common words')
        sns.set_context(font_scale=1.25, rc={"lines.linewidth": 2.5})
        sns.barplot(x_pos, counts, palette='husl')
        plt.xticks(x_pos, words, rotation=90)
        plt.xlabel('words')
        plt.ylabel('counts')
        plt.savefig(TOP_WORDS_IMG)

    def analyse(self):
        log("Analysing dataset")
        self.wordcloud()
        self.most_common_words()
        log("Wordcloud and most common words graphics created")
