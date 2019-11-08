import os
import tweomepy as tw
import pandas as pd


consumer_key = 'HwUEqgF56skhAZhDzRMxv8M1z'
consumer_secret = 'rUy8XFBtbMxvtNbuFIhMebvktsb9UYjRtqD0KTajRKEwwnXx43'
access_token = '2285804160-8Rj0PMDmqUfvKUm9V7LF1kpCsqUrPlCP9WRu9Te'
access_token_secret = 'PE1eRcRm76phpDc7G5OWmmOIplrVzHPUsvpukHKqi3d5f'

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
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