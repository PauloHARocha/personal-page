import os, json
from flask import Flask, render_template


app = Flask(__name__)
app.secret_key = 'super secret key'



#Updates needed so you can have an article menu of categories:
#render the template just with the categories for the articles menu
#create another route that returns a json with the articles given a categorie
#create a script using fetch so you can get the articles when a categorie is clicked
# initialize with the first categorie
@app.route('/')
def index():
    with open('articles.json') as json_file:
        articles = json.load(json_file)
    return render_template('index.html',
                            categories=articles['categories'],
                            articles=articles['articles'],
                            choosen_categorie=articles['categories'][0])

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
