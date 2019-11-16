import csv
import re
import tweepy as tw
from src.settings import *

def get_english_tweets(screen_name):

    auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    api = tw.API(auth)

    all_tweets = []

    # Only allows 200 tweets at a time
    new_tweets = api.user_timeline(screen_name = screen_name, count=200)

    all_tweets.extend(new_tweets)

    oldest = all_tweets[-1].id - 1

    while len(new_tweets) > 0:
        new_tweets = api.user_timeline(screen_name = screen_name, count=200, max_id=oldest)

        all_tweets.extend(new_tweets)

        oldest = all_tweets[-1].id - 1

        print("...%s tweets checked..." % (len(all_tweets)))

    eng_tweets = []

    for tweet in all_tweets:
        if tweet.lang == "en":
            tweet.text = re.sub(r'http\S+', '', tweet.text)
            eng_tweets.append(tweet)

    tweets_array = [[tweet.id_str, tweet.created_at, tweet.user.screen_name, tweet.text.encode('ascii', 'ignore').decode('ascii')] for tweet in eng_tweets]

    with open('%s_tweets.csv' % screen_name, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(["id","created_at", "user", "text"])
        writer.writerows(tweets_array)

    pass


if __name__ == '__main__':
    # Username account
    get_english_tweets("nicktolhurst")