import os
import pickle
import re
from datetime import datetime
import pandas as pd
from sklearn import svm
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split, RandomizedSearchCV, ShuffleSplit, GridSearchCV
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.naive_bayes import MultinomialNB
from sklearn.neighbors import KNeighborsClassifier

from settings import CLASSIFIER_PATH
from topic_classifier.feature_engineering import FeatureEngineering
import numpy as np


class TopicClassifier:
    def __init__(self, df_data=None, df_path=None):
        self.df_data = df_data if df_data is not None else pd.read_csv(df_path + "/topics.csv")
        # self.data = FeatureEngineering(self.df_data).clean()
        self.data = self.df_data
        self._get_topic_mapping()
        self.id = re.sub(r'-| |:|\.', '_', str(datetime.now()))
        self.save_path = f"{CLASSIFIER_PATH}/{self.id}"
        os.makedirs(self.save_path)

    def _get_topic_mapping(self):
        self.topic_mapping = {}
        for i, topic in enumerate(self.data['Topic'].unique()):
            self.topic_mapping[i] = topic
        for key in self.topic_mapping.keys():
            self.data['Topic'] = self.data['Topic'].replace(self.topic_mapping[key], key)

    def compute_best_hyperparameters(self, features_train, labels_train, algorithm):
        search, is_search = self._get_random_search(algorithm)
        if is_search:
            search.fit(features_train, labels_train)
            print(search.best_score_)
            with open(f'{self.save_path}/best_estimator.pickle', 'wb') as output:
                pickle.dump(search.best_estimator_, output)
            return search.best_estimator_
        else:
            return search

    @staticmethod
    def _get_random_search(algorithm):
        if algorithm == "svc":
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
            return RandomizedSearchCV(estimator=svc,
                                      param_distributions=random_grid,
                                      n_iter=50,
                                      scoring='accuracy',
                                      cv=3,
                                      verbose=1,
                                      random_state=8), True
        elif algorithm == "rfc":
            n_estimators = [int(x) for x in np.linspace(start=200, stop=1000, num=5)]
            # max_features
            max_features = ['auto', 'sqrt']

            # max_depth
            max_depth = [int(x) for x in np.linspace(20, 100, num=5)]
            max_depth.append(None)

            # min_samples_split
            min_samples_split = [2, 5, 10]

            # min_samples_leaf
            min_samples_leaf = [1, 2, 4]

            # bootstrap
            bootstrap = [True, False]
            random_grid = {'n_estimators': n_estimators,
                           'max_features': max_features,
                           'max_depth': max_depth,
                           'min_samples_split': min_samples_split,
                           'min_samples_leaf': min_samples_leaf,
                           'bootstrap': bootstrap}
            rfc = RandomForestClassifier(random_state=8)
            return RandomizedSearchCV(estimator=rfc,
                                      param_distributions=random_grid,
                                      n_iter=50,
                                      scoring='accuracy',
                                      cv=3,
                                      verbose=1,
                                      random_state=8), True
        elif algorithm == "knn":
            # Create the parameter grid
            n_neighbors = [int(x) for x in np.linspace(start=1, stop=300, num=100)]

            param_grid = {'n_neighbors': n_neighbors}

            # Create a base model
            knnc = KNeighborsClassifier()

            # Manually create the splits in CV in order to be able to fix a random_state (GridSearchCV doesn't have
            # that argument)
            cv_sets = ShuffleSplit(n_splits=3, test_size=.33, random_state=8)

            # Instantiate the grid search model
            return GridSearchCV(estimator=knnc,
                                param_grid=param_grid,
                                scoring='accuracy',
                                cv=cv_sets,
                                verbose=1), True
        elif algorithm == "lrc":
            # C
            c = [float(x) for x in np.linspace(start=0.1, stop=1, num=10)]

            # multi_class
            multi_class = ['multinomial']

            # solver
            solver = ['newton-cg', 'sag', 'saga', 'lbfgs']

            # class_weight
            class_weight = ['balanced', None]

            # penalty
            penalty = ['l2']

            # Create the random grid
            random_grid = {'C': c,
                           'multi_class': multi_class,
                           'solver': solver,
                           'class_weight': class_weight,
                           'penalty': penalty}

            lrc = LogisticRegression(random_state=8)
            # Instantiate the grid search model
            return RandomizedSearchCV(estimator=lrc,
                                      param_distributions=random_grid,
                                      n_iter=50,
                                      scoring='accuracy',
                                      cv=3,
                                      verbose=1,
                                      random_state=8), True
        elif algorithm == "gbc":
            # n_estimators
            n_estimators = [200, 800]

            # max_features
            max_features = ['auto', 'sqrt']

            # max_depth
            max_depth = [10, 40, None]

            # min_samples_split
            min_samples_split = [10, 30, 50]

            # min_samples_leaf
            min_samples_leaf = [1, 2, 4]

            # learning rate
            learning_rate = [.1, .5]

            # subsample
            subsample = [.5, 1.]

            # Create the random grid
            random_grid = {'n_estimators': n_estimators,
                           'max_features': max_features,
                           'max_depth': max_depth,
                           'min_samples_split': min_samples_split,
                           'min_samples_leaf': min_samples_leaf,
                           'learning_rate': learning_rate,
                           'subsample': subsample}
            gbc = GradientBoostingClassifier(random_state=8)
            return RandomizedSearchCV(estimator=gbc,
                                      param_distributions=random_grid,
                                      n_iter=50,
                                      scoring='accuracy',
                                      cv=3,
                                      verbose=1,
                                      random_state=8), True

        elif algorithm == "lsvc":
            return svm.LinearSVC(random_state=8), False

        elif algorithm == "mnbc":
            return MultinomialNB(), False

    def classify(self, save=True, best=True, path=None, algorithm="rfc"):
        x_train, x_test, y_train, y_test = train_test_split(self.data['Text'],
                                                            self.data['Topic'],
                                                            test_size=0.15,
                                                            random_state=8)
        max_features = 300
        tfidf = TfidfVectorizer(lowercase=False,
                                max_features=max_features)
        features_train = tfidf.fit_transform(x_train).toarray()
        labels_train = y_train
        features_test = tfidf.transform(x_test).toarray()
        labels_test = y_test
        if save:
            self.save_features(features_train, features_test, labels_train, labels_test)
        if best:
            estimator = self.compute_best_hyperparameters(features_train, labels_train, algorithm)
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
        aux_df = self.data[['Topic']].drop_duplicates().sort_values('Topic')
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
