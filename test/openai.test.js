require('dotenv').config();
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const promptRoutes = require('@handler/prompt');

// Express 앱 설정
const app = express();
app.use(bodyParser.json());
app.use('/prompt', promptRoutes);

describe('POST /openai/generate', () => {
    // Open AI Health Check
    it('should return generated text from OpenAI', async () => {
        const message = 'Tell me a joke about cats.';

        const response = await request(app)
            .post('/prompt')
            .send({
                message: message,
                userName: 'Andrew'
            });

        expect(response.body).toBeDefined();
        expect(response).toBe(200);
        //expect(response.body.choices[0].text).toBeDefined();
       // expect(response.body).toHaveProperty('choices');
    });

    /*
    it('should return an error if prompt is not provided', async () => {
        const response = await request(app)
            .post('/openai/generate')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Prompt is required');
    });

    it('should return an error if OpenAI API fails', async () => {
        // OpenAI API 키를 잘못된 값으로 설정
        process.env.OPENAI_API_KEY = 'invalid-key';
        const prompt = 'Tell me a joke about dogs.';

        const response = await request(app)
            .post('/openai/generate')
            .send({prompt});

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error generating text');

        // 올바른 API 키로 복구
        process.env.OPENAI_API_KEY = 'your-valid-openai-api-key';
    });
     */
});
