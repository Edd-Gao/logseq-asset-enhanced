const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// POST endpoint
app.post('/openfile', (req, res) => {
    const filePath = req.body.filePath;

    // Basic validation for filePath
    if (!filePath) {
        console.error("No file path provided");
        return res.status(400).send('No file path provided');
    }

    // Sanitize the filePath to prevent command injection
    // Implement necessary sanitization based on your requirements
    const sanitizedFilePath = filePath.replace(/ /g, "\\ ");

    // Execute the command to open the file
    exec(`open -R ${sanitizedFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error opening file: ${sanitizedFilePath}`);
        }
        console.log(`open filepath: ${sanitizedFilePath}`)
        res.send(`File opened: ${sanitizedFilePath}`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
