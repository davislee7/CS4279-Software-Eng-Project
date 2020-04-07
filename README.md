# CS4279-ST3ND
First, **navigate to project directory** backend folder ST3ND/Backend, then create and activate a virtualenv
```
virtualenv -p python3 $HOME/tmp/deepspeech-venv/
source $HOME/tmp/deepspeech-venv/bin/activate
```

Install DeepSpeech
```
pip3 install deepspeech
```

**Double check that you are in the backend folder of the project directory**
Download pre-trained English model and extract
```
curl -LO https://github.com/mozilla/DeepSpeech/releases/download/v0.6.1/deepspeech-0.6.1-models.tar.gz
tar xvf deepspeech-0.6.1-models.tar.gz
```
Download example audio files
```shell script
curl -LO https://github.com/mozilla/DeepSpeech/releases/download/v0.6.1/audio-0.6.1.tar.gz
tar xvf audio-0.6.1.tar.gz
```
Now we're ready to run
```
python app.py
```