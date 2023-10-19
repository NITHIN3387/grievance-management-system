const {db, firebaseConfig} = require('../config/dbConnection');

const {initializeApp} = require('@firebase/app')
const {getStorage, getDownloadURL, uploadBytesResumable, ref} = require('@firebase/storage')

// Creating a complaints collection in the database
const complaints = db.collection("complaints");

// Description: Stores problems in the database
// Method: POST
// Access: Public
const uploadComplaints = async (req, res) => {
    initializeApp(firebaseConfig)

    //getting firebase instance for the initialized app
    const storage = getStorage()

    try {
        const { description, date, department } = req.body; // Getting the data from request.body
        const photo = req.file

        //getting storage refferace to the cloud storage
        const storageRef = ref(storage, "grievance-images/" + Date.now() + "-" + Math.round(Math.random() * 1E9))       //for making a unique name of the photo we use uploaded date and a random number

        //Create file metadata including the content type
        const metadata = {
            contentType: photo.mimetype
        }

        //upload the file in the bucket storage
        await uploadBytesResumable(storageRef, photo.buffer, metadata)
        .then(async (snapshot) => (
            //get the download url of the image
            await getDownloadURL(snapshot.ref)
        ))
        .then(async (imageUrl) => {
            // Save the data in the complaints collection
            await complaints.add({
                description,
                date,
                department,
                imageUrl
            })
            .then(() => {
                res.status(200).send({message: "complaint submitted successfully", status: "success"})
            })
        })
    } catch (error) {
        res.status(500).send({ message: "Error submitting complaint", status: "fail" });
        console.log('Error submitting complaint:', error);
    }
};

module.exports = { uploadComplaints };