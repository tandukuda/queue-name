const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// File to store the current name
const NAME_FILE_PATH = path.join(__dirname, 'current_name.txt');

// Function to read current name
function getCurrentName() {
    try {
        return fs.readFileSync(NAME_FILE_PATH, 'utf8').trim() || 'Waiting for name...';
    } catch (error) {
        return 'Waiting for name...';
    }
}

// Function to update name
function updateName(name) {
    fs.writeFileSync(NAME_FILE_PATH, name || 'Waiting for name...', 'utf8');
}

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/view', (req, res) => {
    res.sendFile(__dirname + '/view.html');
});

// Endpoint to update name
app.post('/update-name', (req, res) => {
    const { name, password } = req.body;
    
    // Simple password protection (change this to your own secret)
    if (password !== 'frontal01') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    updateName(name);
    res.json({ message: 'Name updated successfully', name: name });
});

// Endpoint to get current name
app.get('/get-name', (req, res) => {
    const currentName = getCurrentName();
    res.json({ name: currentName });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});