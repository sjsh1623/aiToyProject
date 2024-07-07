require('dotenv').config();
const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});
const model = 'gpt-3.5-turbo-0125';

module.exports = async (prompt) => {
    return openai.chat.completions.create({
        messages: [{role: "system", content: prompt}],
        response_format:[{ "type": "json_object" }],
        model: model,
    });
}
