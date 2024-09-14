const express = require('express');
const router = express.Router();

const MenuItem = require("./../models/MenuItems");


router.get('/', async (req, res) => {
    try {
        
        const data = await MenuItem.find(req.body);
        console.log("data fetched successful");
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"no data found"})
    }
});

// storing MenuItem data in DB
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming  request body contains the devotee data

        //create new devotee document document using mongoose model
        const response = await MenuItem.insertMany(data);

        // Save the new devotee data
        // const response = await newMenuItem.save()
        console.log("data saved successful");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}); 

module.exports = router;