const express = require('express');
const router = express.Router();

const Devotee = require("./../models/DevoteeEntity");

// for finding
router.get('/:name', async (req, res) => {
    try {

        const nameType = req.params.name; // Extract the work type from the URL parameter
        
        const data = await Devotee.find({fullName:nameType});
        console.log("data fetched successful");
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"no data found"})
    }
});

// storing Devotee data in DB
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming  request body contains the devotee data

        //create new devotee document document using mongoose model
        const newDevotee = new Devotee(data);

        // Save the new devotee data
        const response = await newDevotee.save()
        console.log("data saved successful");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
});

// for updating
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the work type from the URL parameter
        const updatedPersonData = req.body; // data for updating
        
        const updatedPerson = await Devotee.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        });
        
        if (!updatedPerson) {
            return res.status(400).json({error: "Person Not Found"})
        }
        // Send the updated person data as a JSON response
        res.json(updatedPerson);
    } catch(err){
        console.log('Error updating person:', err);
        res.status(500).json({error:"internal server error"})
    }
});


// for deleting
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the work type from the URL parameter
        
        const deletedPerson = await Devotee.findByIdAndDelete(personId);
        
        if (!deletedPerson) {
            return res.status(400).json({error: "No Data found to delete"})
        }
        // Send the updated person data as a JSON response
        res.json(deletedPerson);
    } catch(err){
        console.log('Error updating person:', err);
        res.status(500).json({error:"internal server error"})
    }
});

module.exports = router;