import os
import pickle
import time
from pprint import pprint
import gensim
import gensim.corpora as corpora
import pandas as pd
from gensim.models import CoherenceModel
from gensim.utils import simple_preprocess
import spacy as spacy
import pyLDAvis
import pyLDAvis.gensim
import matplotlib.pyplot as plt
from src.settings import PRE_PROCESSED, MALLET_PATH, TOPICS_PER_SENTENCE, SENTENCE_PER_TOPIC
from src.utils import ENGLISH_STOPWORDS, log


def sent_to_words(sentences):
    for sentence in sentences:
        yield gensim.utils.simple_preprocess(str(sentence), deacc=True)  # deacc=True removes punctuations


def remove_stopwords(texts):
    return [[word for word in simple_preprocess(str(doc)) if word not in ENGLISH_STOPWORDS] for doc in texts]


class TopicModeling:
    def __init__(self, df):
        self.df = df
        self.data = df.tweet.values.tolist()
        self.data_words = list(sent_to_words(self.data))
        self._generate_models()
        self.lda = None

    def _generate_models(self):
        data_words_nostops = remove_stopwords(self.data_words)
        data_words_bigrams = self._make_bigrams(data_words_nostops)
        self.data_lemmatized = self._lemmatization(data_words_bigrams, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV'])
        self.id2word = corpora.Dictionary(self.data_lemmatized)
        texts = self.data_lemmatized
        self.corpus = [self.id2word.doc2bow(text) for text in texts]

    def model(self, method="mallet", num_topics=6, show=True):
        if method == "mallet":
            model = self._lda_mallet(num_topics)
        else:
            model = self._lda_model(num_topics)
        if show:
            pprint(self.lda.show_topics(formatted=False))
            pprint(self.lda.print_topics())
            self.get_coherence()
            self.visualize(model, num_topics)

    def _lda_mallet(self, num_topics):
        # Download File: http://mallet.cs.umass.edu/dist/mallet-2.0.8.zip
        self.lda = gensim.models.wrappers.LdaMallet(MALLET_PATH, corpus=self.corpus,
                                                    num_topics=num_topics, id2word=self.id2word)
        return gensim.models.wrappers.ldamallet.malletmodel2ldamodel(self.lda)

    def _lda_model(self, num_topics):
        self.lda = gensim.models.ldamodel.LdaModel(corpus=self.corpus,
                                                   id2word=self.id2word,
                                                   num_topics=num_topics,
                                                   random_state=100,
                                                   update_every=1,
                                                   chunksize=100,
                                                   passes=10,
                                                   alpha='auto',
                                                   per_word_topics=True)
        return self.lda

    def get_coherence(self):
        # a measure of how good the model is. lower the better.
        coherence_model_lda = CoherenceModel(model=self.lda, texts=self.data_lemmatized,
                                             dictionary=self.id2word, coherence='c_v')
        coherence_lda = coherence_model_lda.get_coherence()
        return coherence_lda

    def _make_bigrams(self, texts):
        bigram = gensim.models.Phrases(self.data_words, min_count=5, threshold=100)  # higher threshold fewer phrases.
        bigram_mod = gensim.models.phrases.Phraser(bigram)
        return [bigram_mod[doc] for doc in texts]

    @staticmethod
    def _lemmatization(texts, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV']):
        texts_out = []
        nlp = spacy.load('en', disable=['parser', 'ner'])
        for sent in texts:
            doc = nlp(" ".join(sent))
            texts_out.append([token.lemma_ for token in doc if token.pos_ in allowed_postags])
        return texts_out

    def visualize(self, model, num_topics):
        ldavis_data_filepath = os.path.join(PRE_PROCESSED + '/ldavis_prepared_' + str(num_topics)
                                            + "_" + str(time.time()))
        ldavis_prepared = pyLDAvis.gensim.prepare(model, self.corpus, self.id2word)
        with open(ldavis_data_filepath, 'wb') as f:
            pickle.dump(ldavis_prepared, f)
        pyLDAvis.save_html(ldavis_prepared, ldavis_data_filepath + '.html')

    def compute_best_model(self, stop, start=2, step=3, show=True):
        coherence_values = []
        model_list = []
        for num_topics in range(start, stop, step):
            self.model(num_topics=num_topics, show=False)
            model_list.append(self.lda)
            coherence_values.append(self.get_coherence())
        if show:
            self.plot_coherence_scores(stop, start, step, coherence_values)
            self.print_coherence_values(stop, start, step, coherence_values)
        self.lda = model_list[coherence_values.index(max(coherence_values))]

    @staticmethod
    def plot_coherence_scores(stop, start, step, coherence_values):
        x = range(start, stop, step)
        plt.plot(x, coherence_values)
        plt.xlabel("Num Topics")
        plt.ylabel("Coherence score")
        plt.legend(("coherence_values"), loc='best')
        plt.show()

    @staticmethod
    def print_coherence_values(stop, start, step, coherence_values):
        x = range(start, stop, step)
        for m, cv in zip(x, coherence_values):
            print("Num Topics =", m, " has Coherence Value of", round(cv, 4))

    def format_topics_sentences(self):
        topics_df = pd.DataFrame()
        # Get main topic in each document
        for i, row in enumerate(self.lda[self.corpus]):
            row = sorted(row, key=lambda x: (x[1]), reverse=True)
            # Get the Dominant topic, Perc Contribution and Keywords for each document
            for j, (topic_num, prop_topic) in enumerate(row):
                if j == 0:  # => dominant topic
                    wp = self.lda.show_topic(topic_num)
                    topic_keywords = ", ".join([word for word, prop in wp])
                    topics_df = topics_df.append(pd.Series([int(topic_num), round(prop_topic, 4), topic_keywords]),
                                                 ignore_index=True)
                else:
                    break
        topics_df.columns = ['Dominant_Topic', 'Perc_Contribution', 'Topic_Keywords']

        # Add original text to the end of the output
        contents = pd.Series(self.data)
        topics_df = pd.concat([topics_df, contents], axis=1)
        return topics_df

    def show_dominant_topics_per_sentence(self):
        df_topic_keywords = self.format_topics_sentences()
        df_dominant_topic = df_topic_keywords.reset_index()
        df_dominant_topic.columns = ['Document_No', 'Dominant_Topic', 'Topic_Perc_Contrib', 'Keywords', 'Text']
        df_dominant_topic.to_csv(TOPICS_PER_SENTENCE, index=False)

    def show_representative_sentence_per_topic(self):
        df_topic_keywords = self.format_topics_sentences()
        topics_sorteddf_mallet = pd.DataFrame()
        stopics_outdf_grpd = df_topic_keywords.groupby('Dominant_Topic')
        for i, grp in stopics_outdf_grpd:
            topics_sorteddf_mallet = pd.concat([topics_sorteddf_mallet,
                                                grp.sort_values(['Perc_Contribution'], ascending=[0]).head(1)], axis=0)
        topics_sorteddf_mallet.reset_index(drop=True, inplace=True)
        topics_sorteddf_mallet.columns = ['Topic_Num', "Topic_Perc_Contrib", "Keywords", "Text"]
        topics_sorteddf_mallet.to_csv(SENTENCE_PER_TOPIC, index=False)
