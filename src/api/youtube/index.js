const {YoutubeTranscript} = require('youtube-transcript');
const gpt = require('../gpt')

// Do not make any change either llama3_8b.js nor openai.js.

const question = (prompt) => {
    return `Here is the video script: ${prompt} Provide the information in the following JSON Array format:` +
        "[" +
        " { \"name : \"place name\", \"description : \"place description\" , \"feature\" : \"place feature\"} \"}," +
        " { \"name : \"place name\", \"description : \"place description\" , \"feature\" : \"place feature\"} \"}," +
        " { \"name : \"place name\", \"description : \"place description\" , \"feature\" : \"place feature\"} \"}," +
        " ..." +
        "]" +
        "I'm going to parse this Json array data as it is, So DO NOT ADD ANY TEXT OUTSIDE OF THE JSON RESPONSE. DO NOT ADD NOTE OR INTRODUCTION OUTSIDE OF THE JSON RESPONSE. USE THE JSON";
}

module.exports = async (url) => {
    const rawData = await YoutubeTranscript.fetchTranscript(url);
    const script = rawData.map(item => item.text).join(' ');
    const summary = await gpt(question(script));
    return JSON.parse(summary);
};
