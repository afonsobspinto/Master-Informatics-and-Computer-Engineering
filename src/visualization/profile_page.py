import json
from flask import Flask
app = Flask(__name__)


@app.route("/")
def hello():
    with open('results.json') as f:
        data = json.load(f)
    return '''
            <html>
                <head>
                    <title>Profiling ''' + data["name"] + '''</title>
                </head>
                <body>
                    <h1>Hello, ''' + data["name"] + '''!</h1>
                    <h2>Age: ''' + str(data["age"]) + '''<h2>
                </body>
            </html>'''


if __name__ == "__main__":
    app.run()
