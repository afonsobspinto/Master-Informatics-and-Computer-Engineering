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

@app.route("/modeling")
def modeling():
    app.send_static_file('html/ldavis_prepared_28_1577566746.2178874.html')
    return render_template('modeling.html')


@app.route('/profile', methods=['POST'])
def profile():
    username = request.form['username']
    rows = request.form['rows']
    checked = request.form.getlist('state')
    print("Username: " + username)
    print("Rows: " + rows)
    print(checked)

    return render_template('user.html', username=username, data=data, cat_len=len(data))


if __name__ == "__main__":
    app.run()
