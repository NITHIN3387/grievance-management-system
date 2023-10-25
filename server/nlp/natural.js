const natural = require('natural');

const classifier = (text, callback) => {
    natural.BayesClassifier.load('./nlp/trained.json', null, (err, classifier) => {
        if (err){
            console.log("fail to classify the text\n", err);
            callback(null)
        }else 
            callback(classifier.classify(text))
    })
}

module.exports = classifier