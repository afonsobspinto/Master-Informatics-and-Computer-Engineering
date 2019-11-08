import tweepy as tw
import pandas as pd
from src.settings import *

auth = tw.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tw.API(auth, wait_on_rate_limit=True)

# Post a tweet from Python
# Your tweet has been posted!

# Define the search term and the date_since date as variables
search_words = "#brexit" + " -filter:retweets"
date_since = "2019-10-10"

# Collect tweets
tweets = tw.Cursor(api.search,
                   q=search_words,
                   lang="en",
                   since=date_since).items(5)

# Collect a list of tweets
users_locs = [[tweet.user.screen_name, tweet.user.location, tweet.text] for tweet in tweets]

tweet_text = pd.DataFrame(data=users_locs,
                          columns=['User', "Location", "Tweet"])
print(tweet_text)