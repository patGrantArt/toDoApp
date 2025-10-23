const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const process = require('process'); 
const appTools = require('./appTools.js'); 
const app = express();

// MIDDLEWARE
app.use(express.json());

//PORTS
const PORT = process.env.PORT ||3000;

//PATHS
const homeDir = process.cwd();

//STATIC SERVER
app.use(express.static(path.join(__dirname, 'public')));

//GLOBAL VARIABLES
let global_appData;
let imageUrls;


// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World! Welcome to your Express server.');
});

app.get('/appData', async (req, res) => {
    console.log("app data requested");

    if (!global_appData) {
        console.log("app data not live, retrieving from file");
        try {
            const data = await fs.readFile('appData.json', 'utf8');
            global_appData = JSON.parse(data);
        } catch (err) {
            console.error('Error reading file:', err);
        }
    }
    res.json(global_appData);
});

app.get('/bgImages', (req, res) => {
     console.log("image data requested");
     res.json(imageUrls);
});


app.post('/toDo', async (req, res) => {
    console.log("post request received")
    global_appData = req.body;
    appTools.toDo_storeDataAsJSON(global_appData);
    res.json({ message: 'toDo list saved to server!' });
    
});


//prepare image URLs
imageUrls = appTools.getImageUrls(homeDir);
console.log("Image URLs:", imageUrls);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});