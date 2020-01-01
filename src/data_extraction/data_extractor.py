import csv
import re
from datetime import datetime

import pandas as pd
import tweepy as tw
from settings import *
from utils import is_english, log


class DataExtractor:
    MAX_ITEMS = 3740

    def __init__(self, filepath=None):
        self.filepath = filepath
        self.id = re.sub(r'-| |:|\.', '_', str(datetime.now()))
        auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        self.api = tw.API(auth, wait_on_rate_limit=True)
        self.tweets = []
        self.topics = []
        self.df = None
        self.user_tweet_ids = []

    @staticmethod
    def get_specific_topics():
        with open(RELATED_WORDS, 'r') as f:
            content = f.readlines()
            return [x.strip() for x in content]

    def extract(self):
        bag_of_words = self.get_specific_topics()
        try:
            for word in bag_of_words:
                log("Collecting tweets about " + word)
                old_tweets = len(self.tweets)
                self.get_tweets_by_category(word)
                new_tweets = len(self.tweets)
                log(str(new_tweets - old_tweets) + " tweets added\n")
        except:
            pass

    def save(self):
        self.df = pd.DataFrame(self.tweets)
        self.df.to_csv(self.filepath, encoding='utf-8', mode='a', header=False)

    def get_user_en_tweets(self, screen_name):
        all_tweets = []
        # Only allows 200 tweets at a time
        new_tweets = self.api.user_timeline(screen_name=screen_name, count=200)
        all_tweets.extend(new_tweets)
        oldest = all_tweets[-1].id - 1
        while len(new_tweets) > 0:
            new_tweets = self.api.user_timeline(screen_name=screen_name, count=200, max_id=oldest)
            all_tweets.extend(new_tweets)
            oldest = all_tweets[-1].id - 1
            log("...%s tweets checked..." % (len(all_tweets)))
        eng_tweets = []
        for tweet in all_tweets:
            if tweet.lang == "en" and is_english(tweet.text):
                eng_tweets.append(tweet)
        tweets_array = [[tweet.id_str, tweet.text.strip(), tweet.user.name, str(tweet.created_at)]
                        for tweet in eng_tweets]

        self.save_user_tweets(screen_name, tweets_array)

    def append_to_raw_data(self, user_df):
        log("Append to dataset")
        raw_data = pd.read_csv(self.filepath, header=None, names=['index', 'id', 'tweet', 'user', 'date'])\
            .drop("index", axis=1)
        self.df = raw_data.append(user_df, ignore_index=True).drop_duplicates()
        self.df.to_csv(self.filepath, header=None, index=None)
        self.user_tweet_ids = user_df.id.values.tolist()

    def save_user_tweets(self, user, tweets):
        save_path = f"{USER_EXTRACTED}/{user}"
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        user_df = pd.DataFrame(tweets)
        user_df.columns = ['id', 'tweet', 'user', 'date']
        user_df.to_csv(f"{save_path}/{self.id}", encoding='utf-8', mode='a', header=False)
        self.append_to_raw_data(user_df)

    def get_tweets_by_category(self, search_keyword):
        for tweet in tw.Cursor(self.api.search, q=search_keyword + ' -filter:retweets', lang='en', rpp=100).items(
                self.MAX_ITEMS):
            tweet_obj = [tweet.id_str, tweet.text.strip(), tweet.user.name, str(tweet.created_at)]
            self.tweets.append(tweet_obj)


if __name__ == '__main__':
    # Username account
    # de = DataExtractor()
    # # de.get_english_tweets("afonsobspinto")
    # search_term = "music"
    # testDataSet = de.get_tweets_by_category(search_term)
    pass
