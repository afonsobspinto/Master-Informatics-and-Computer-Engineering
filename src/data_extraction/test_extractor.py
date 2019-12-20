# Uncomment the following two lines only in the first run, then comment again
# import nltk
# nltk.download('wordnet')

from nltk.corpus import wordnet
synonyms = []
hypernyms = []
holonyms = []
meronyms = []
antonyms = []

for syn in wordnet.synsets("politics"):
    for l in syn.lemmas():
        synonyms.append(l.name())
        if l.antonyms():
            antonyms.append(l.antonyms()[0].name())
        if l.hypernyms():
            hypernyms.append(l.hypernyms()[0].name())
        if l.part_holonyms():
            holonyms.append(l.holonyms()[0].name())
        if l.part_meronyms():
            meronyms.append(l.meronyms()[0].name())

print(set(synonyms))
print(set(antonyms))
print(set(hypernyms))
print(set(holonyms))
print(set(meronyms))
