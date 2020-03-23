import flask
from flask import request, jsonify
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True

f = open("stanfordtest.json", "r")
g = f.read()
y = json.loads(g)

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for transcript and keyword search.</p>'''


@app.route('/api/v1/transcript', methods=['GET'])
def transcript():
    transcript = ""
    if 'id' in request.args:
        id = str(request.args['id'])
    else:
        return "Error: No id field provided. Please specify a transcript id"
    file = open(id, "r")
    text = file.read()
    textJson = json.loads(g)
                              
    for words in textJson["words"]:
        transcript += words["word"] + " "
    return jsonify(transcript)


@app.route('/api/v1/keywordsearch', methods=['GET'])
def keyword_search():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'keyword' in request.args:
        keyword = str(request.args['keyword'])
    else:
        return "Error: No keyword field provided. Please specify a keyword."

    # Create an empty list for our results
    jsondump = {"name": keyword, "timeStamps": []}

    for words in y["words"]:
        if words["word"] == keyword:
            jsondump["timeStamps"].append(words["start_time "])

    return jsonify(jsondump)


app.run()
