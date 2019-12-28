import os
import pickle
import uuid
from pprint import pprint
import gensim
import spacy as spacy
import gensim.corpora as corpora
from gensim.models import CoherenceModel
import pyLDAvis
import pyLDAvis.gensim
from gensim.utils import simple_preprocess

from src.settings import PRE_PROCESSED
from src.utils import ENGLISH_STOPWORDS


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
        self.lda_model = None

    def _generate_models(self):
        data_words_nostops = remove_stopwords(self.data_words)
        data_words_bigrams = self._make_bigrams(data_words_nostops)
        self.data_lemmatized = self._lemmatization(data_words_bigrams, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV'])
        self.id2word = corpora.Dictionary(self.data_lemmatized)
        texts = self.data_lemmatized
        self.corpus = [self.id2word.doc2bow(text) for text in texts]

    def analyse(self, num_topics=6):
        self.lda_model = gensim.models.ldamodel.LdaModel(corpus=self.corpus,
                                                         id2word=self.id2word,
                                                         num_topics=num_topics,
                                                         random_state=100,
                                                         update_every=1,
                                                         chunksize=100,
                                                         passes=10,
                                                         alpha='auto',
                                                         per_word_topics=True)
        pprint(self.lda_model.print_topics())
        self.evaluate()
        self.visualize(num_topics)

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

    def evaluate(self):
        if self.lda_model:
            # a measure of how good the model is. lower the better.
            print('\nPerplexity: ', self.lda_model.log_perplexity(self.corpus))
            coherence_model_lda = CoherenceModel(model=self.lda_model, texts=self.data_lemmatized,
                                                 dictionary=self.id2word, coherence='c_v')
            coherence_lda = coherence_model_lda.get_coherence()
            print('\nCoherence Score: ', coherence_lda)

    def visualize(self, num_topics):
        ldavis_data_filepath = os.path.join(PRE_PROCESSED + '/ldavis_prepared_' + str(num_topics)
                                            + "_" + str(uuid.uuid4()))
        ldavis_prepared = pyLDAvis.gensim.prepare(self.lda_model, self.corpus, self.id2word)
        with open(ldavis_data_filepath, 'wb') as f:
            pickle.dump(ldavis_prepared, f)
        pyLDAvis.save_html(ldavis_prepared, ldavis_data_filepath + '.html')
