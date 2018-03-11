import csv

with open('HTRU_2.csv', 'rU') as csv_file:
    csv_reader = csv.reader(csv_file)
    list = []

    for line in csv_reader:
        list.append(line)

    print(list)