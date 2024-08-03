const axios = require('axios');
const fs = require('fs');
const {PassThrough} = require('stream');
require('dotenv').config();

const model = process.env.LLAMA3_MODEL;
const askPath = `${process.env.LLAMA3_8B_URL}/api/generate`;
const send = async (prompt) => {
    try {
        const result = await axios.post(askPath, {
            model: model,
            prompt: prompt,
            stream: false
        });
        return result.data.response;
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

const sendStream = async (prompt) => {
    try {
        const response = await axios({
            method: 'post',
            url: askPath,
            data: {
                model: model,
                prompt: prompt,
                stream: true
            },
            responseType: 'stream'
        });

        const passThrough = new PassThrough();
        response.data.pipe(passThrough);

        // Optionally, write the stream to a file
        const writeStream = fs.createWriteStream('output.txt');
        passThrough.pipe(writeStream);

        // Also log each chunk to the console
        passThrough.on('data', (chunk) => {
            console.log('Received chunk:', chunk.toString());
        });

        passThrough.on('end', () => {
            console.log('Stream ended.');
        });

        passThrough.on('error', (error) => {
            console.error('Error in stream:', error);
        });

    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

module.exports = {send, sendStream};
