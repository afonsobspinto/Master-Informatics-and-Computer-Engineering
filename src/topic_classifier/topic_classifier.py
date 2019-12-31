import os
import pickle
import re
from datetime import datetime
import pandas as pd
from sklearn import svm
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split, RandomizedSearchCV
import matplotlib.pyplot as plt
import seaborn as sns
from settings import CLASSIFIER_PATH


class TopicClassifier:
    def __init__(self, df_data=None, df_path=None):
        self.df_data = df_data if df_data is not None else pd.read_csv(df_path + "/topics.csv")
        # with open("/home/afonso/Projects/UGent/ICT/ICT/src/topic_classifier/df.pickle", 'rb') as data:
        #     self.df_data = pickle.load(data)
        # self.df_data = self.df_data.drop(["File_Name", "Complete_Filename", "Content_Parsed", "Category_Code"], axis=1)
        # self.df_data.to_csv("t.csv", index=False)
        self._get_topic_mapping()
        self.id = re.sub(r'-| |:|\.', '_', str(datetime.now()))
        self.save_path = f"{CLASSIFIER_PATH}/{self.id}"
        os.makedirs(self.save_path)

    def _get_topic_mapping(self):
        self.topic_mapping = {}
        for i, topic in enumerate(self.df_data['Topic'].unique()):
            self.topic_mapping[i] = topic
        for key in self.topic_mapping.keys():
            self.df_data['Topic'] = self.df_data['Topic'].replace(self.topic_mapping[key], key)

    def compute_best_hyperparameters(self, features_train, labels_train):
        c = [.0001, .001, .01]
        gamma = [.0001, .001, .01, .1, 1, 10, 100]
        degree = [1, 2, 3, 4, 5]
        kernel = ['linear', 'rbf', 'poly']
        probability = [True]
        random_grid = {'C': c,
                       'kernel': kernel,
                       'gamma': gamma,
                       'degree': degree,
                       'probability': probability
                       }
        svc = svm.SVC(random_state=8)
        random_search = RandomizedSearchCV(estimator=svc,
                                           param_distributions=random_grid,
                                           n_iter=50,
                                           scoring='accuracy',
                                           cv=3,
                                           verbose=1,
                                           random_state=8)
        random_search.fit(features_train, labels_train)
        print(random_search.best_score_)
        with open(f'{self.save_path}/best_estimator.pickle', 'wb') as output:
            pickle.dump(random_search.best_estimator_, output)
        return random_search.best_estimator_

    def classify(self, save=True, best=True, path=None):
        x_train, x_test, y_train, y_test = train_test_split(self.df_data['Text'],
                                                            self.df_data['Topic'],
                                                            test_size=0.15,
                                                            random_state=8)
        max_features = 5
        tfidf = TfidfVectorizer(lowercase=False,
                                max_features=max_features)
        features_train = tfidf.fit_transform(x_train).toarray()
        labels_train = y_train
        features_test = tfidf.transform(x_test).toarray()
        labels_test = y_test
        if save:
            self.save_features(features_train, features_test, labels_train, labels_test)

        if best:
            estimator = self.compute_best_hyperparameters(features_train, labels_train)
        elif path is not None:
            with open(path, 'rb') as data:
                estimator = pickle.load(data)
        estimator.fit(features_train, labels_train)
        svc_pred = estimator.predict(features_test)
        self.analyse(labels_train, labels_test, features_train, estimator, svc_pred)

    def analyse(self, labels_train, labels_test, features_train, estimator, svc_pred):
        print("The training accuracy is: ")
        print(accuracy_score(labels_train, estimator.predict(features_train)))
        print("The test accuracy is: ")
        print(accuracy_score(labels_test, svc_pred))
        print("Classification report")
        print(classification_report(labels_test, svc_pred))
        aux_df = self.df_data[['Topic']].drop_duplicates().sort_values('Topic')
        conf_matrix = confusion_matrix(labels_test, svc_pred)
        plt.figure(figsize=(12.8, 6))
        topics_arr = self._get_topics_arr(aux_df)
        sns.heatmap(conf_matrix,
                    annot=True,
                    xticklabels=topics_arr,
                    yticklabels=topics_arr,
                    cmap="Blues")
        plt.ylabel('Predicted')
        plt.xlabel('Actual')
        plt.title('Confusion matrix')
        plt.savefig(f"{self.save_path}/confusion.png")

    def _get_topics_arr(self, df):
        arr = []
        for val in df['Topic'].values:
            arr.append(self.topic_mapping[val])
        return arr

    def save_features(self, features_train, features_test, labels_train, labels_test):
        # features_train
        with open(f'{self.save_path}/features_train.pickle', 'wb') as output:
            pickle.dump(features_train, output)

        # labels_train
        with open(f'{self.save_path}/labels_train.pickle', 'wb') as output:
            pickle.dump(labels_train, output)

        # features_test
        with open(f'{self.save_path}/features_test.pickle', 'wb') as output:
            pickle.dump(features_test, output)

        # labels_test
        with open(f'{self.save_path}/labels_test.pickle', 'wb') as output:
            pickle.dump(labels_test, output)
