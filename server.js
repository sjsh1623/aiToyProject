const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Import routes
const promptRoutes = require('./src/handler/prompt');
app.use('/prompt', promptRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
