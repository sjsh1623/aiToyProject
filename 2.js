const {Configuration, OpenAIApi} = require('openai');
const bodyParser = require('body-parser');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateResponse(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
    });
    return response.data.choices[0].text.trim();
}

// Example usage
generateResponse("Hello, how can I help you?").then(response => {
    console.log(response);
});
