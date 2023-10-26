const fs = require('fs');
const natural = require('natural');

const classifier = new natural.BayesClassifier()

//reading the test.csv file and storing the data in variable data
const data = fs.readFileSync('test.csv', 'utf8').split("\n")
//spliting the data into text and label and storing it in testData variable
const testData = data.map(data => data.split(","))

//adding the testData to classifier
testData.forEach(([value, label]) => {
    classifier.addDocument(value, label)
})

//training the model
classifier.train()

//saving the trained model in json formate
classifier.save("trained.json", (err, classifier) => {})