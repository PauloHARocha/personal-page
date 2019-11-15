import os, json
from flask import Flask, render_template, send_from_directory
from flask_jsglue import JSGlue


app = Flask(__name__)
app.secret_key = 'super secret key'
jsglue = JSGlue(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/articles/<name>')
def articles(name):
    return render_template(f'articles/{name}.html')

@app.route('/cv')
def send_cv():
    return send_from_directory('static/img', 'PauloRochaCV.pdf')

@app.route('/init/articles')
def init():
    with open('articles.json') as json_file:
        articles = json.load(json_file)
    return articles


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
