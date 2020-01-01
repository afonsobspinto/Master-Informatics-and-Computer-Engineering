import re
import pandas as pd
import tweepy as tw
from settings import *
import csv
fi = open("C:\\Users\\EHSAN.FALLAH\\PycharmProject\\ICT\\data\\training.1600000.processed.noemoticon.csv" , "r")
reader = pd.read_csv(fi)
ID = []
user = []
for row in reader:
    name = row[1]
    print(name)
    ID.append(name)
    name2 = row[4]
    user.append(name2)
print(id)

"""
from src.settings import *


class DataSetStatistics:
    cols = ['polarity', 'id', 'date', 'query_string', 'user', 'tweet']
    f = pd.read_csv("C:\\Users\\EHSAN.FALLAH\\PycharmProject\\ICT\\data\\training.1600000.processed.noemoticon.csv", names=self.cols, encoding=self.encoding)

    encoding = "ISO-8859-1"
    def __init__(self, filepath):
        f = pd.read_csv(filepath, names=self.cols, encoding=self.encoding)
        auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        self.api = tw.API(auth)
        self.final_data_frame = []
        drop_cols = ['polarity', 'date', 'query_string', 'id', 'tweet']
        self.df.drop(columns=drop_cols, inplace=True)
        self.get_stats()

    def get_stats(self):
        for index, row in self.df.iterrows():
            print(row['user'])
            self.get_status_user(row['user'])

    def get_status_user(self, user):
        user_stats = self.api.get_user(screen_name=user)
        self.final_data_frame.append(user_stats)

    def visualise(self):
        age = 0
        gender = 0
        location = 0
        age, gender, location
        for entry in self.final_data_frame:
            age = age + entry.age
        age = age / len(self.final_data_frame)
        print(age)
"""