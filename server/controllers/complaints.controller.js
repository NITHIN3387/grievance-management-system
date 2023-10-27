const exif = require('exif-parser');
const axios = require('axios');

const { db, firebaseConfig } = require('../config/dbConnection');
const classifier = require('../nlp/natural');

const { initializeApp } = require('@firebase/app')
const { getStorage, getDownloadURL, uploadBytesResumable, ref } = require('@firebase/storage');

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
        const { description, date, userId, userName } = req.body; // Getting the data from request.body
        const photo = req.file
        // const department = classifier.classify(description)

        //<------------------ fetching exif meta data of the image -------------->
        const buffer = photo.buffer             //storing buffer code of the img
        const parser = exif.create(buffer)
        const exifData = parser.parse()         //fecthing the exif data of the image

        //storing latitude and logitude of the location where photo is taken
        const latitude = exifData.tags.GPSLatitude
        const longitude = exifData.tags.GPSLongitude

        //api url to fetch location name through the location latitude and longitude
        const locationApiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

        if (latitude || longitude) {
            //fetching the location using api
            const location = await axios.get(locationApiUrl)
                .then((res) => res.data.display_name)
                .catch((err) => {
                    console.log("fail to fetch location\n", err);
                })

            //<----------------- storing img in firebase cloude storage ----------------------->
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
                    //finding the department to which problem belongs to
                    classifier(description, async (department) => {
                        // Save the data in the complaints collection
                        department && await complaints.add({
                            description,
                            date,
                            department,
                            imageUrl,
                            location,
                            // userId,
                            // userName
                        })
                        .then((data) => {
                            res.status(200).send({ message: "complaint submitted successfully", status: "success", _id: data.id })
                        })
                    })
                })
        } else {
            res.status(404).send({ message: "exif data of the image does not has location information", status: "metadata error" })
        }
    } catch (error) {
        res.status(500).send({ message: "Error submitting complaint", status: "fail" });
        console.log('Error submitting complaint:', error);
    }
};

// Description: fetch the complaints department wise from the database
// Method: GET
// Access: Private
const getComplaintByDepartment = async (req, res) => {
    const email = req.user.email.split('@')[1] 
    const department = email.split('.')[0]

    await complaints.where("department", "==", department).get()      //checking if there are any complaints in database with the provided department
    .then((data) => {
        const complaintData = data.docs.map((doc) => ( {_id: doc.id, ...doc.data()} ))        //mapping the received datas
        res.status(200).send({ message: 'complaint fetch succssfully', status: "success", data: complaintData});
    })
    .catch((err) => {
        res.status(500).send({ message: 'fail to fetch the complaints', status: "error" })
        console.log(err);
    })
}

module.exports = { uploadComplaints, getComplaintByDepartment };