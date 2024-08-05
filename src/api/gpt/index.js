const openai = require('./openai');
const llama3_8b = require('./llama3_8b')

// AI API Handling here!
// Do not make any change either llama3_8b.js nor openai.js.
module.exports = (prompt, isStream = false, model) => {
    switch(model) {
        case 'openAI' :
            return openai(prompt);
        case 'gemini' :
            return null
        default :
            return isStream ? llama3_8b.sendStream(prompt) : llama3_8b.send(prompt);
    }
};
s
