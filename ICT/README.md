# Profile Anyone

Have you ever wonder what your twitter feed tells about you? We will let you know

## Topics

- [Sentiment Analysis](https://en.wikipedia.org/wiki/Sentiment_analysis)
- [Topic modelling](https://en.wikipedia.org/wiki/Topic_model)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Setup and activate a virtual environment (Python 3.6 or higher)
2. Follow the instructions to get a development environment running:

```$bash
git clone https://github.ugent.be/efallahm/ICT.git
cd ICT
./install_dependencies.sh
pip3 install -r requirements.txt
```

3. Run the tool
   `cd src python web_app.py`

## Use the application

To use the website application you need to do the following:

- Type the username of the person you want to profile, specify the number of rows that you want to use, check the steps that you want the algorithm to take and press the Submit button

![Main Page](./docs/.Report_images/main_page.png?raw=true)

- A number of subjects in the dropdown will appear and after you select one, you'll get the user's respective interest on the topic, in the form of percentages.

![Profiled User page](./docs/.Report_images/profiled3.png?raw=true)

- There's a tab for the topic modeling as well, where you can see an interactive topic visualization

![Topic Modeling Page](./docs/.Report_images/modeling.png?raw=true)

- You can also view the statistics about the profiled tweets and their authors by clicking on the Statistics button in the navigation bar.

![Statistics Page](./docs/.Report_images/statistics.png?raw=true)

### Shout-out to

- [Flask](https://www.palletsprojects.com/p/flask/)
- [Gensim](https://github.com/RaRe-Technologies/gensim)
- [Matplotlib](https://matplotlib.org/)
- [NLTK](https://www.nltk.org/)
- [Pandas](https://pandas.pydata.org/)
- [Skikit-Learn](https://scikit-learn.org/stable/)
- [TextBlob](https://textblob.readthedocs.io/en/dev/)

### Authors

- Afonso Pinto
- Ehsan Fallah
- Tomás Oliveira
