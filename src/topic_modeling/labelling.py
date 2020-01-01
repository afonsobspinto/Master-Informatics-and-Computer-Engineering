import os
import re
from datetime import datetime

import pandas as pd
from settings import MODELS_PATH
from utils import log


class Labelling:
    cols = ['Document_No', 'Dominant_Topic', 'Topic_Perc_Contrib', 'Topic', 'Text']

    def __init__(self, df_topic_keywords=None, filepath=None):
        try:
            self.df_topic_keywords = df_topic_keywords if df_topic_keywords is not None \
                else pd.read_csv(filepath + "/dominant_topics_per_sentence.csv", names=self.cols, skiprows=1)
            if df_topic_keywords is None:
                self.id = re.sub(r'-| |:|\.', '_', str(datetime.now()))
                self.save_path = f"{MODELS_PATH}/{self.id}"
                os.makedirs(self.save_path)
            else:
                self.save_path = filepath
        except:
            raise Exception("Invalid Parameters")

    def manual_label(self):
        for topic in self.df_topic_keywords['Topic'].unique():
            print(topic)
            replace = input()
            self.df_topic_keywords = self.df_topic_keywords.replace(topic, replace)

    def automatic_label(self):
        for topic in self.df_topic_keywords['Topic'].unique():
            replace = topic.split(',')[0]
            self.df_topic_keywords = self.df_topic_keywords.replace(topic, replace)

    def save(self):
        self.df_topic_keywords = self.df_topic_keywords.drop(['Dominant_Topic', 'Perc_Contribution'],
                                                             axis=1)
        self.df_topic_keywords.to_csv(f"{self.save_path}/topics.csv", index=False)
        log("Labels saved")
