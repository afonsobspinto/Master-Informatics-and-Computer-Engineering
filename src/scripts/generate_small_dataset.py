import pandas as pd
from settings import COMBINED_DATASET, SMALL_COMBINED_DATASET


def generate_dataset(rows):
    big_pd = pd.read_csv(COMBINED_DATASET, header=None)
    small_pd = big_pd.sample(n=rows)
    small_pd.to_csv(SMALL_COMBINED_DATASET, encoding='utf-8', index=False, header=None)


if __name__ == "__main__":
    generate_dataset(1)
