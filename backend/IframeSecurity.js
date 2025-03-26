const fs = require("fs");
const path = require("path");
require("dotenv").config();

const API_KEY = process.env.KEY;
const IframePath = path.join(__dirname, 'IframePath');

function main(req, res) {
    const { key, game } = req.query; 

    if (!game || !key) {
        return res.status(400).json({message: "Missing required parameters"});
    }
    
    if (key !== API_KEY) {
        return res.status(403).json({message: "Invalid API key"});
    }

    try {
        const gamesPath = path.join(__dirname, 'games.json');
        const gamesData = fs.readFileSync(gamesPath, 'utf8');
        const games = JSON.parse(gamesData);
        
        const foundGame = games.find(g => g.name.toLowerCase() === game.toLowerCase());
        if (!foundGame) {
            return res.status(404).json({ message: "Game not found" });
        }

        const gameFilePath = path.join(IframePath, `${foundGame.fileName}`);
        const destinationPath = path.join(__dirname, 'copy_of_games', `${foundGame.fileName}`);
        fs.copyFileSync(gameFilePath, destinationPath);

        res.json({ game: foundGame });
    } catch (error) {
        return res.status(500).json({ message: "Error processing request", error: error.message });
    }
}

module.exports = main;