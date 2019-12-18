from src.settings import KEY_WORDS, TOPICS, RELATED_WORDS
import json
from google import google


def _get_words(topics):
    bag_of_words = set()
    for topic in topics:
        if topics[topic]:
            with open(KEY_WORDS + topic) as f:
                content = f.readlines()
                words = []
                for expression in content:
                    word = expression.strip()
                    gr = google.search(expression)
                    entries = gr[0].number_of_results if len(gr) > 0 else 0
                    words.append((word, entries))
                words.sort(key=lambda tup: tup[1], reverse = True)
                for t in words[:10]:
                    bag_of_words.add(t[0])
    return bag_of_words


def main():
    bag_of_words = list(_get_words(TOPICS))
    with open(RELATED_WORDS, 'w') as filehandle:
        json.dump(bag_of_words, filehandle)


if __name__ == "__main__":
    main()
