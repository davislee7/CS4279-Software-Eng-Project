import json

f = open("stanfordtest.json", "r")
g = f.read()
y = json.loads(g)

keyword = input("What keyword are you looking for? ")

keyword = str(keyword)

jsondump = {"name": keyword, "timeStamps": []}

for words in y["words"]:
    if words["word"] == keyword:
        jsondump["timeStamps"].append(words["start_time "])
        
print (jsondump)




