import csv
import re

import pandas as pd
import tweepy as tw
from settings import *
from utils import is_english, log


class DataExtractor:
    MAX_ITEMS = 3740

    def __init__(self, filepath):
        self.filepath = filepath
        auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        self.api = tw.API(auth, wait_on_rate_limit=True)
        self.tweets = []
        self.topics = []
        self.df = None

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
                log(str(new_tweets-old_tweets) + " tweets added\n")
        except:
            pass

    def save(self):
        self.df = pd.DataFrame(self.tweets)
        self.df.to_csv(self.filepath, encoding='utf-8', mode='a', header=False)

    def get_english_tweets(self, screen_name):
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
                tweet.text = re.sub(r'http\S+', '', tweet.text)
                eng_tweets.append(tweet)
        tweets_array = [[tweet.id_str, tweet.created_at, tweet.user.screen_name,
                         tweet.text.encode('ascii', 'ignore').decode('ascii')] for tweet in eng_tweets]
        with open('%s_tweets.csv' % screen_name, 'w') as f:
            writer = csv.writer(f)
            writer.writerow(["id", "created_at", "user", "text"])
            writer.writerows(tweets_array)

    def get_tweets_by_category(self, search_keyword):
        for tweet in tw.Cursor(self.api.search, q=search_keyword + ' -filter:retweets', lang='en', rpp=100).items(self.MAX_ITEMS):
            tweet_obj = [tweet.id_str, tweet.text.strip(), tweet.user.name, str(tweet.created_at)]
            self.tweets.append(tweet_obj)


if __name__ == '__main__':
    # Username account
    # de = DataExtractor()
    # # de.get_english_tweets("afonsobspinto")
    # search_term = "music"
    # testDataSet = de.get_tweets_by_category(search_term)
    pass
