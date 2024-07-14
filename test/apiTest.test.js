require('dotenv').config();
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const chat = require('../src/routes/chat');
jest.setTimeout(8000);
// Express 앱 설정
const app = express();
app.use(bodyParser.json());
app.use('/chat', chat);

describe('POST /chat', () => {
    // Open AI Health Check
    it('Check AI API', async () => {
        const message = 'Hi there';
        const response = await request(app)
            .post('/chat')
            .send({
                message: message,
                userName: 'Andrew'
            });

        expect(response.body).toBeDefined();
        expect(response.status).toBe(200);
    });
});
