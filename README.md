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

## DeepSpeech setup for Windows 😊

**1. Download Windows Subsystem for Linux**
![Microsoft Store](/images/Store.png)

**2. Run the Ubuntu App and cd into our directory**
![WSL](/images/WSL.png)

**3. Setup Python for Ubuntu**
* Check if Python3 is installed with `python3 --version`
* Install pip with `sudo apt install python3-pip`
* Install venv with `sudo apt install python3-venv`

[Link here for more info](https://docs.microsoft.com/en-us/windows/python/web-frameworks#install-python-pip-and-venv)

* Create the virtual environment with `python3 -m venv .venv`
* Set the source with `source .venv/bin/activate`

[Look here for info on creating a virtual environment](https://docs.microsoft.com/en-us/windows/python/web-frameworks#create-a-virtual-environment)

**4. Install packages**
* Try to install flask with `pip3 install flask`
* Try to install deepspeech with `pip3 install deepspeech`

**5. Follow the rest of the instructions up top**