import enum
import nltk

# Download this on the first run only:
nltk.download('stopwords')

ENGLISH_STOPWORDS = set(nltk.corpus.stopwords.words('english'))
NON_ENGLISH_STOPWORDS = set(nltk.corpus.stopwords.words()) - ENGLISH_STOPWORDS

STOPWORDS_DICT = {lang: set(nltk.corpus.stopwords.words(lang)) for lang in nltk.corpus.stopwords.fileids()}


class Polarity(enum.Enum):
    POSITIVE = 4
    NEGATIVE = 0


def is_english(tweet_text):
    tweet_text = tweet_text.lower()
    words = set(nltk.wordpunct_tokenize(tweet_text))
    return len(words & ENGLISH_STOPWORDS) > len(words & NON_ENGLISH_STOPWORDS)
