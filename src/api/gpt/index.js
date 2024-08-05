const openai = require('./openai');
const llama3_8b = require('./llama3_8b')
const gemini = require('./gemini');

// AI API Handling here!
// Do not make any change either llama3_8b.js nor openai.js.
module.exports = (prompt, isStream = false, model) => {
    switch(model) {
        case 'openAI' :
            // Open AI
            return openai(prompt);
        case 'gemini' :
            // Google Gemini
            return gemini(prompt)
        default :
            // On Device : LLama3.1:8b
            return isStream ? llama3_8b.sendStream(prompt) : llama3_8b.send(prompt);
    }
};
