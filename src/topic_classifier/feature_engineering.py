from nltk import WordNetLemmatizer
from nltk.corpus import stopwords


class FeatureEngineering:
    def __init__(self, df):
        self.df = df

    def clean(self):
        self.replace()
        self.lemmatization()
        self.stop_words()
        return self.df

    def replace(self):
        self.df['Text'] = self.df['Text'].str.replace("\r", " ")
        self.df['Text'] = self.df['Text'].str.replace("\n", " ")
        self.df['Text'] = self.df['Text'].str.replace("    ", " ")
        self.df['Text'] = self.df['Text'].str.replace('"', '')
        self.df['Text'] = self.df['Text'].str.lower()
        punctuation_signs = list("?:!.,;")
        for punct_sign in punctuation_signs:
            self.df['Text'] = self.df['Text'].str.replace(punct_sign, '')
        self.df['Text'] = self.df['Text'].str.replace("'s", "")

    def lemmatization(self):
        wordnet_lemmatizer = WordNetLemmatizer()
        nrows = len(self.df)
        lemmatized_text_list = []

        for row in range(0, nrows):

            # Create an empty list containing lemmatized words
            lemmatized_list = []

            # Save the text and its words into an object
            text = self.df.loc[row]['Text']
            text_words = text.split(" ")

            # Iterate through every word to lemmatize
            for word in text_words:
                lemmatized_list.append(wordnet_lemmatizer.lemmatize(word, pos="v"))

            # Join the list
            lemmatized_text = " ".join(lemmatized_list)

            # Append to the list containing the texts
            lemmatized_text_list.append(lemmatized_text)
        self.df['Text'] = lemmatized_text_list

    def stop_words(self):
        stop_words = list(stopwords.words('english'))
        for stop_word in stop_words:
            regex_stopword = r"\b" + stop_word + r"\b"
            self.df['Text'] = self.df['Text'].str.replace(regex_stopword, '')
