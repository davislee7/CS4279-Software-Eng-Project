import json

f = open("stanfordtest.json", "r")
g = f.read()
y = json.loads(g)

transcript = ""
for words in y["words"]:
    transcript += words["word"] + " "
print (transcript)

