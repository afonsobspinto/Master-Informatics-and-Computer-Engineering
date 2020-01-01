import json
import os
import re
from datetime import datetime
import pandas as pd
from textblob import TextBlob
from settings import RESULTS_PATH


class SentimentAnalysis:
    def __init__(self, user_ids, df_data=None, df_path=None):
        self.df_data = df_data if df_data is not None else pd.read_csv(df_path + "/topics.csv")
        self.user_ids = set(user_ids)
        self.id = re.sub(r'-| |:|\.', '_', str(datetime.now()))
        self.counter = {}

    def analyse(self):
        for index, row in self.df_data.iterrows():
            if str(row['id']) in self.user_ids:
                topic = row['Topic']
                if topic in self.counter.keys():
                    self.counter[topic].append(self.sentiment(row['Text']))
                else:
                    self.counter[topic] = [self.sentiment(row['Text'])]

    def save(self, user):
        save_path = f"{RESULTS_PATH}/{user}"
        result = self.get_average()
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        with open(f'{save_path}/result.json', 'w') as output:
            json.dump(result, output)

    def get_average(self):
        result = {}
        for key, value_list in self.counter.items():
            total_tweets = len(value_list)
            positive = 0
            neutral = 0
            negative = 0
            for sentiment in value_list:
                if sentiment > 0:
                    positive += 1
                elif sentiment < 0:
                    negative += 1
                elif sentiment == 0:
                    neutral += 1
            result[key] = {
                'positive': positive/total_tweets * 100,
                'neutral': neutral/total_tweets * 100,
                'negative': negative/total_tweets * 100,
            }
        return result

    @staticmethod
    def sentiment(text):
        analysis = TextBlob(text)
        return analysis.sentiment.polarity
