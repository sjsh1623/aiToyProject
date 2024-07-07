const express = require('express');
const router = express.Router();
const askJob = require('/src/openai/askJob')

// Mock function to validate reservation
const validateReservation = (data) => {
    // Here you can add actual validation logic
    return data && data.message;
};

router.post('/', (req, res) => {
    const { message, userName } = req.body;

    // Validate
    if (!validateReservation(req.body)) {
        return res.status(400).send({ message: 'Invalid Message' });
    }

    // Ask Open AI
    const job = askJob(message)

    console.log(job);
});

module.exports = router;
