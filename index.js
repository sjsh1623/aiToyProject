const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Import routes
const chat = require('./src/routes/chat');
app.use('/chat', chat);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
