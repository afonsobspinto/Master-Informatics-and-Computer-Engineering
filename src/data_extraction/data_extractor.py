import csv
import re
import tweepy as tw
from src.settings import *
from src.utils import is_english


class DataExtractor:
    KEYWORDS = ['music', 'politics'] # todo: fill with more general topics

    def __init__(self, filepath):
        self.filepath = filepath
        auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        self.api = tw.API(auth, wait_on_rate_limit=True)
        self.tweets = []
        self.topics = []

    def get_specific_topics(self):
        """
        for k in KEYWORDS:
            syns = wordnet.synsets(k)
            self.topics.append(syns)
        """
        pass

    def extract(self):
        """
        get_specific_topics()
        for t in self.topics:
            get_tweets_by_category(t)
        """
        pass

    def save(self):
        """
        self.clean_df = pd.DataFrame(self.tweet)
        self.clean_df.to_csv(self.filepath, encoding='utf-8')
        :return:
        """



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
            print("...%s tweets checked..." % (len(all_tweets)))
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
        try:
            # todo: add loop
            # todo: add if different tweet id
            tweets_fetched = self.api.search(search_keyword, count=150)
            # self.tweets.append(tweets_fetched)
            return [{"text": status.text, "label": None} for status in tweets_fetched]
        except:
            print("Unfortunately, something went wrong..")
            return None


if __name__ == '__main__':
    # Username account
    de = DataExtractor()
    #de.get_english_tweets("afonsobspinto")
    search_term = "music"
    testDataSet = de.get_tweets_by_category(search_term)


