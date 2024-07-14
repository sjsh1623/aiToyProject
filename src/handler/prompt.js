const express = require('express');
const getJob = require('../api/job')
const router = express.Router();
// Mock function to validate reservation
const validateReservation = (data) => {
    // Here you can add actual validation logic
    return data && data.message;
};

router.post('/', (req, res) => {
    console.log(req)
    const { message, userName } = req.body;

    // Validate
    if (!validateReservation(req.body)) {
        return res.status(400).send({ message: 'Invalid Message' });
    }

    // Ask Open AI
    const job = getJob(message)
    console.log(job);
});

module.exports = router;
