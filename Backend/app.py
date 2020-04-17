import flask
import os
import json
from flask import request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from pathlib import Path
import subprocess

app = flask.Flask(__name__)
app.config["DEBUG"] = True

f = open("stanfordtest.json", "r")
g = f.read()
y = json.loads(g)


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for transcript and keyword search.</p>'''

# TODO: Change this maybe? Right now it saves in current folder
DIRECTORY = Path(__file__).parent.absolute()

@app.route('/api/v1/upload', methods=['POST'])
def upload():
    file = request.files['uploadedFile']
    if file:
        filename: str = secure_filename(file.filename)
        print(filename)
        file.save(os.path.join(DIRECTORY, filename))

    # subprocess.run(['source', '$HOME/tmp/deepspeech-venv/bin/activate'],
    #                 stdout=subprocess.PIPE,
    #                 universal_newlines=True)
    deepspeechString = "deepspeech "
    deepspeechModel = "--model deepspeech-0.6.1-models/output_graph.pbmm "
    deepspeechAudio = "--audio "
    deepspeechAudio += filename
    deepspeechString += deepspeechModel
    deepspeechString += deepspeechAudio
    deepspeechString += " --json > "
    deepspeechString += filename[:len(filename) - 4]
    deepspeechString += ".json"
    process = subprocess.run(deepspeechString,
                             shell=True,
                             universal_newlines=True)
    print(process)
    return jsonify(filename)


@app.route('/api/v1/transcript', methods=['GET'])
def transcript():
    transcript = ""
    if 'id' in request.args:
        id = str(request.args['id'])
    else:
        return "Error: No id field provided. Please specify a transcript id"
    file = open(id + ".json", "r")
    text = file.read()
    textJson = json.loads(text)

    for words in textJson["words"]:
        transcript += words["word"] + " "
    return jsonify(textJson)


@app.route('/api/v1/audio', methods=['GET'])
def getAudio():
    transcript = ""
    if 'id' in request.args:
        id = str(request.args['id'])
    else:
        return "Error: No id field provided. Please specify a transcript id"
    try:
        return send_from_directory(DIRECTORY, filename=id)
    except FileNotFoundError:
        return "Error: File not found"


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
    file = open(keyword, "r")
    text = file.read()
    textJson = json.loads(text)
    for words in textJson["words"]:
        if words["word"] == keyword:
            jsondump["timeStamps"].append(words["start_time "])

    return jsonify(jsondump)


app.run()
