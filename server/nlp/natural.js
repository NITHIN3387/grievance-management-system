const natural = require('natural');

const classifier = (text, callback) => {
    //loading the trained model
    natural.BayesClassifier.load('./nlp/trained.json', null, (err, classifier) => {
        // checking whether there is any err or not 
        if (err){
            console.log("fail to classify the text\n", err);
            callback(null)
        }else 
            callback(classifier.classify(text)) //returning the department to which complaint belongs
    })
}

module.exports = classifier