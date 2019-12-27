import os

from src.settings import EXTRACTED_DATASETS, COMBINED_DATASET

dir_tree = os.walk(EXTRACTED_DATASETS)
for dirpath, dirnames, filenames in dir_tree:
    pass

csv_list = []
for file in filenames:
    if file.endswith('.csv'):
        csv_list.append(file)

csv_merge = open(COMBINED_DATASET, 'w')

for file in csv_list:
    csv_in = open(dirpath + '/' + file)
    for line in csv_in:
        csv_merge.write(line)
    csv_in.close()
print('Verify consolidated CSV file : ' + COMBINED_DATASET)