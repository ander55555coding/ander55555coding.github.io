const fs = require('fs');
const path = require('path');

function main() {
    const gamesData = JSON.parse(fs.readFileSync('games.json', 'utf8'));
    gamesData.games.forEach(game => {
      if (game.Visible) { // Only create files for visible games
          const newFileName = `${game.name.toLowerCase().replace(/\s+/g, '')}.html`; // Remove spaces and hyphens
          const newFilePath = path.join(outputDir, newFileName);
    
          // Replace keywords in the template
          const name =  game.name.toLowerCase().replace(/-/g, '');
          const img = game.image.toLowerCase().replace(/-/g, '');
          let newContent = template
              .replace(/GamePathInsert/g, game.IframePath) // Remove hyphens from IframePath
              .replace(/GameImgInsert/g, img) // Convert image to lowercase and remove hyphens
              .replace(/GameNameInsert/g, name) // Update game name to lowercase and remove hyphens
              .replace(/CreatorNameInsert/g, game.creator); // Update creator name
    
          // Write the new file
          fs.writeFileSync(newFilePath, newContent);
          console.log(`Created: ${newFileName}`);
      }
    });    
}

module.exports = main;