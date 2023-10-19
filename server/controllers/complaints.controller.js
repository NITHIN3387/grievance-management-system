const db = require('../config/dbConnection');
const admin = require('firebase-admin'); // Corrected import statement
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage'); // Corrected import statement
const multer = require('multer');

// ... rest of your code


// Creating a complaints collection in the database
const complaints = db.collection("complaints");

// Description: Stores problems in the database
// Method: POST
// Access: Private
const uploadComplaints = async (req, res) => {
    try {
        initializeApp(complaints);
        const storage = getStorage();
        const upload = multer({ storage: multer.memoryStorage() });
        const { description, date, department } = req.body; // Getting the data from request.body

        // Validating the presence of required data
        console.log(description,date,department)
        if (!description || !date || !department) {
            return res.status(400).send({ message: "Missing required data", status: "fail" });
        }

        // Save the data in the complaints collection
        const docRef = await complaints.add({
            description,
            date,
            department,
        });

        // Uploading the file to the Firebase storage
        upload.single("filename")(req, res, async (err) => {
            // Handle multer upload error
            if (err) {
                return res.status(500).send({ message: "Error uploading file", status: "fail", error: err });
            }

            try {
                const dateTime = giveCurrentDateTime(); // Assuming the implementation of giveCurrentDateTime function

                const storageRef = ref(storage, files/`${req.file.originalname + " " + dateTime}`);

                // Create file metadata including the content type
                const metadata = {
                    contentType: req.file.mimetype,
                };

                // Upload the file to the storage bucket
                const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

                // Retrieve the public URL of the uploaded file
                const downloadURL = await getDownloadURL(snapshot.ref);

                console.log('File successfully uploaded.');
                return res.status(200).send({
                    message: 'File uploaded to Firebase storage and data submitted to database',
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    downloadURL: downloadURL,
                    documentId: docRef.id, // Sending the document ID for reference
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                return res.status(500).send({ message: "Error uploading file", status: "fail", error: error.message });
            }
        });
    } catch (error) {
        console.error('Error submitting complaint:', error);
        return res.status(500).send({ message: "Error submitting complaint", status: "fail", error: error.message });
    }
};

module.exports = { uploadComplaints };