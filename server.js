const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Store the current values in memory
let currentName = 'Waiting for name...';
let currentSide = 'THE DARKSIDE';
let currentLoadingDuration = 5;  // Default 5 minutes

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

// Add a new route for led.html
app.get('/led', (req, res) => {
    res.sendFile(path.join(__dirname, 'led.html'));
});

// Endpoint to update name
app.post('/update-name', (req, res) => {
    const { name, password, side, loadingDuration } = req.body;
    
    // Simple password protection (change this to your own secret)
    if (password !== 'HERDWERK2025') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    currentName = name || 'Waiting for name...';
    
    // Update side and loading duration if provided
    if (side) {
        currentSide = side;
    }
    
    if (loadingDuration) {
        currentLoadingDuration = parseInt(loadingDuration, 10);
    }
    
    console.log('Name updated to:', currentName);
    console.log('Side updated to:', currentSide);
    console.log('Loading duration updated to:', currentLoadingDuration, 'minutes');
    
    res.json({ 
        message: 'Information updated successfully', 
        name: currentName,
        side: currentSide,
        loadingDuration: currentLoadingDuration
    });
});

// Endpoint to get current settings
app.get('/get-name', (req, res) => {
    res.json({ 
        name: currentName,
        side: currentSide,
        loadingDuration: currentLoadingDuration
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
