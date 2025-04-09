const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Store the current name in memory
let currentName = 'Waiting for name...';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'view.html'));
});

// Endpoint to update name
app.post('/update-name', (req, res) => {
    const { name, password } = req.body;
    
    // Simple password protection (change this to your own secret)
    if (password !== 'frontal01') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    currentName = name || 'Waiting for name...';
    console.log('Name updated to:', currentName);
    res.json({ message: 'Name updated successfully', name: currentName });
});

// Endpoint to get current name
app.get('/get-name', (req, res) => {
    res.json({ name: currentName });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
