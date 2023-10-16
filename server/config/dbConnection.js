const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURMENT_ID
}

const serviceAccount = require('../serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...firebaseConfig
})

const db = admin.firestore()

//checking whether the db connection is successfull or not
db.listCollections()
.then(() => {
    console.log('database connected succesfully');
})
.catch((err) => {
    console.log('fail to connect database\n', err);
})

module.exports = db