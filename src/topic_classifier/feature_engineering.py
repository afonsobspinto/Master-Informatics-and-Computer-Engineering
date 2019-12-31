class FeatureEngineering:
    def __init__(self, df):
        self.df = df

    def clean(self):
        self.df['Text'] = self.df['Text'].str.replace("\r", " ")
        self.df['Text'] = self.df['Text'].str.replace("\n", " ")
        self.df['Text'] = self.df['Text'].str.replace("    ", " ")
        self.df['Text'] = self.df['Text'].str.replace('"', '')