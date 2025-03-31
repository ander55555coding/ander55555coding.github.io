const fs = require('fs');
const path = require('path');

// Define the template variable
const template = fs.readFileSync(path.join(__dirname, '..', 'indextemplate.html'), 'utf8');

function main() {
    let errors = 0;
    let files = 0;

    if (!fs.existsSync('g')) {
        fs.mkdirSync('g');
    }

    const gamesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'games.json'), 'utf8'));
    gamesData.games.forEach(game => {
        try {
            if (game.visible === 1) { // Only create files for visible games

                // Ensure iframepath is defined
                if (!game.iframepath) {
                    console.error(`Error: IframePath is undefined for game: ${game.name}`);
                    return;
                }

                // Ensure image is defined
                if (!game.image) {
                    console.error(`Error: Image is undefined for game: ${game.name}`);
                    return;
                }
    
                const newFileName = `${game.name.toLowerCase().replace(/\s+/g, '')}.html`; // Remove spaces and hyphens
                const outputDir = 'g'; // Set outputDir to the 'g' directory
                const newFilePath = path.join(outputDir, newFileName);
    
                // Replace keywords in the template
                const creator = game.creator.replace(/-/g, ' ');
                const name = game.name.replace(/-/g, ' ');
                const img = game.image.replace(/-/g, '').toLowerCase();
                let newContent = template
                    .replace(/GamePathInsert/g, game.iframepath) // Use the defined iframepath
                    .replace(/GameImgInsert/g, img) // Convert image to lowercase and remove hyphens
                    .replace(/GameNameInsert/g, name) // Update game name to lowercase and remove hyphens
                    .replace(/CreatorNameInsert/g, creator) // Update creator name
                    .replace(/no index/g, "index");
                    console.log(img)
    
                // Write the new file
                fs.writeFileSync(newFilePath, newContent);
                files = files + 1;
            }
        } catch (error) {
            console.error(`Error processing game: ${game.name}. Error: ${error.message}`); // Log the specific error
            errors = errors + 1; // Increment errors count
        }
    });    

    console.log(`build completed with ${errors} error(s) and ${files} total.`); // Move this outside the forEach loop
}

main();

module.exports = main;