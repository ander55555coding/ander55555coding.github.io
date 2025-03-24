const fs = require('fs');
const path = require('path');

// Function to convert games.json contents to lowercase and remove hyphens
function main() {
    const gamesFilePath = 'games.json';
    const gamesData = fs.readFileSync(gamesFilePath, 'utf8');
    const modifiedData = gamesData.toLowerCase().replace(/-/g, ''); // Convert to lowercase and remove hyphens
    fs.writeFileSync(gamesFilePath, modifiedData);
}

// Convert games.json to lowercase and remove hyphens at the start
module.exports = main;