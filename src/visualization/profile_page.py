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


@app.route('/profile', methods = ['POST'])
def profile():
    username = request.form['username']
    print("The username is '" + username + "'")
    return render_template('user.html', username=username)


if __name__ == "__main__":
    app.run()
