import time

import flask
import os
import json
from flask import request, jsonify, send_from_directory, abort
from werkzeug.utils import secure_filename
from pathlib import Path
import subprocess

app = flask.Flask(__name__)
app.config["DEBUG"] = True


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
    # newFile = str(DIRECTORY) + "/" + filename[:len(filename) - 4] + ".json"
    # while not os.path.exists(newFile):
    #     print(newFile)
    #     time.sleep(1)
    return jsonify(filename)


@app.route('/api/v1/transcript', methods=['GET'])
def transcript():
    if 'id' in request.args:
        id = str(request.args['id'])
    else:
        return "Error: No id field provided. Please specify a transcript id"
    id = id.split('.')[0]
    file = open(id + ".json", "r")
    text = file.read()
    textJson = json.loads(text)

    tscript = []
    words = []
    totalTime = 0

    result = {
        "action": "audio-transcribe"
    }

    retval = dict()
    retval["status"] = True

    for index, word in enumerate(textJson["words"]):
        tscript.append(word["word"] + " ")
        item = {
            "start": word["start_time "],
            "confidence": 1.0,
            "end": word["start_time "] + word["duration"],
            "word": word["word"],
            "punct": word["word"],
            "index": index
        }
        totalTime = word["start_time "] + word["duration"]
        words.append(item)

    segmentation = {
        "metadata": {
            "version": "0.0.10"
        },
        "@type": "AudioFile",
        "speakers": [
            {
                "@id": "Speaker",
                "gender": "M"
            }
        ],
        "segments": [
            {
                "@type": "Segment",
                "start": 0,
                "duration": totalTime,
                "bandwidth": "S",
                "speaker": {
                    "@id": "S0",
                    "gender": "M"
                }
            }
        ]
    }
    retval["punct"] = "".join(tscript)
    retval["words"] = words
    retval["segmentation"] = segmentation
    result["retval"] = retval

    return jsonify(result)


@app.route('/api/v1/audio', methods=['GET'])
def getAudio():
    if 'id' in request.args:
        id = str(request.args['id'])
    else:
        return "Error: No id field provided. Please specify a transcript id"
    try:
        return send_from_directory(DIRECTORY, filename=id)
    except FileNotFoundError:
        abort(404)


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
