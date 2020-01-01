import json
from flask import Flask, render_template, request
app = Flask(__name__)

with open('results.json') as f:
    data = json.load(f)


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/statistics")
def statistics():
    return render_template('statistics.html')


@app.route('/profile', methods=['POST'])
def profile():
    username = request.form['username']
    return render_template('user.html', username=username, data=data, cat_len=len(data))


if __name__ == "__main__":
    app.run()
