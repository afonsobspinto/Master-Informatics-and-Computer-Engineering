import os
import pickle

import pyLDAvis
from sklearn.decomposition import LatentDirichletAllocation as LDA
from pyLDAvis import sklearn as sklearn_lda

from src.settings import PRE_PROCESSED


class TopicModeling:
    def __init__(self, da, number_topics=5):
        self.da = da
        self.number_topics = number_topics
        self.lda = LDA(n_components=number_topics)
        self.lda.fit(self.da.count_data)

    def print_topics(self, number_of_words=10):
        words = self.da.count_vectorizer.get_feature_names()
        for topic_idx, topic in enumerate(self.lda.components_):
            print(f"\nTopic {topic_idx}:")
            print(" ".join([words[i] for i in topic.argsort()[:-number_of_words - 1:-1]]))

    def analyse(self, save=True):
        ldavis_data_filepath = os.path.join(PRE_PROCESSED + '/ldavis_prepared_' + str(self.number_topics))
        if save:
            ldavis_prepared = sklearn_lda.prepare(self.lda, self.da.count_data, self.da.count_vectorizer)
            with open(ldavis_data_filepath, 'wb') as f:
                pickle.dump(ldavis_prepared, f)
        with open(ldavis_data_filepath, 'rb') as f:
            ldavis_prepared = pickle.load(f)

        pyLDAvis.save_html(ldavis_prepared, ldavis_data_filepath + '.html')
        self.print_topics()
