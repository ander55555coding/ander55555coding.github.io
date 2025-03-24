const express = require('express'); // Import the express module
const fs = require('fs'); // Import the fs module
const path = require('path'); // Import the path module
const CreateGameFiles = require('../tools/CreateGameFiles'); // Import the CreateGameFiles module

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const API_KEY = process.env.KEY; // Define your API key here

// Function to add a new game to games.json
app.post('/addGame', (req, res) => {
    const { key, dryRun, ...newGame } = req.body; // Get the key, dryRun flag, and new game data from the request body

    // Check if the provided key matches the expected API key
/*    if (key !== API_KEY) {
        return res.status(403).send('Forbidden: Invalid API key');
    }*/

    // Read the existing games.json
    fs.readFile('../../games.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        const games = JSON.parse(data); // Parse the JSON data

        // If dryRun is true, simulate the addition of the new game
        if (dryRun) {
            const simulatedGames = [...games.games, newGame]; // Simulate adding the new game
            return res.status(200).json({
                message: 'Dry run successful. The following game would be added:',
                game: newGame,
                allGames: simulatedGames
            });
        }

        // Add the new game to the array
        games.games.push(newGame); // Add the new game to the array

        // Write the updated array back to games.json
        fs.writeFile('games.json', JSON.stringify(games, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            } else {
                console.log('New game added successfully!');
                return res.status(201).send('New game added successfully!');
            }
        });
    });

    CreateGameFiles(); // Call the function to create game files
});

app.get('/games', (req, res) => {
    const gamesFilePath = path.join(__dirname, '..', 'Games.json'); // Fix path

    fs.readFile(gamesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading games data');
        }
        try {
            const gamesData = JSON.parse(data);
            res.json(gamesData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('Error parsing games data');
        }
    });
});

module.exports = app; // Export the app for use in server.js