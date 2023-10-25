const fs = require('fs');
const natural = require('natural');

const classifier = new natural.BayesClassifier()

const data = fs.readFileSync('test.csv', 'utf8').split("\n")
const examples = data.map(data => data.split(","))

examples.forEach(([value, label]) => {
    classifier.addDocument(value, label)
})

classifier.train()

classifier.save("trained.json", (err, classifier) => {})