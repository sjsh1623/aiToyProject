const express = require('express');
const router = express.Router();
const aiApi = require('../api/gpt')
// Mock function to validate reservation
const isMessage = (data) => {
    // Here you can add actual validation logic
    return data && data.message;
};

router.post('/', async (req, res) => {
    const {message, userId} = req.body;

    // Validate
    if (!isMessage(req.body)) {
        return res.status(400).send({message: 'Invalid Message'});
    }

    // Ask Open AI
    const aiResponse = await aiApi(message)
    return res.status(aiResponse.status).send(aiResponse.data.response);
});

router.post('/live', (req, res) => {
    const { message, userId } = req.body;

    // Validate
    if (!isMessage(req.body)) {
        return res.status(400).send({ message: 'Invalid Message' });
    }

    // Ask Open AI
    const aiResponse = aiApi(message)
    console.log(aiResponse);
});

module.exports = router;
