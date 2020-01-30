import json
from flask import Flask, render_template, request
from profile_any_one import profile_any_one
from utils import latest_file
from shutil import copyfile

RESULTS_PATH = "../data/processed/results/"
MODELS_PATH = "../data/processed/models"

app = Flask(__name__, template_folder='web_app/templates', static_folder="web_app/static")


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/statistics")
def statistics():
    return render_template('statistics.html')


@app.route("/modeling")
def modeling():
    path = "web_app/static/html/model.html"
    flask_path = "html/model.html"
    file = latest_file(MODELS_PATH, "html")
    copyfile(file, path)
    app.send_static_file(flask_path)
    return render_template('modeling.html')


@app.route('/profile', methods=['POST'])
def profile():
    username = request.form['username']
    try:
        rows = int(request.form['rows'])
    except:
        rows = 0
    extractor = False
    cleaner = False
    analyser = False
    modeller = False
    labelling = False
    if (request.form.get('extractor')) == 'True':
        extractor = True
    if (request.form.get('cleaner')) == 'True':
        cleaner = True
    if (request.form.get('analyser')) == 'True':
        analyser = True
    if (request.form.get('modeller')) == 'True':
        modeller = True
    if (request.form.get('labelling')) == 'True':
        labelling = True
    phase = {
        "extractor": extractor,
        "user": True,
        "cleaner": cleaner,
        "analyser": analyser,
        "modeller": modeller,
        "labelling": labelling,
        "classifier": False,
        "sentiment": True,
    }

    profile_any_one(phase, rows, username)
    file_path = f"{RESULTS_PATH}/{username}/result.json"
    with open(file_path) as f:
        data = json.load(f)

    return render_template('user.html', username=username, data=data, cat_len=len(data))


if __name__ == "__main__":
    app.run()
