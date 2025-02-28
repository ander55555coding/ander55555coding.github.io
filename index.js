const fs = require('fs');
const path = require('path');

// Load Games.json
const gamesData = JSON.parse(fs.readFileSync('Games.json', 'utf8'));

// Load existing sitemap
const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Template file path
const templateFilePath = path.join(__dirname, 'indextemplate.html');

// Read the template file
const template = fs.readFileSync(templateFilePath, 'utf8');

// Define the output directory
const outputDir = path.join(__dirname, 'G');

// Check if the output directory exists, if not, create it
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to create HTML files from the template
gamesData.games.forEach(game => {
    if (game.Visible) { // Only create files for visible games
        const newFileName = `${game.name.replace(/\s+/g, '')}.html`; // Remove spaces and hyphens
        const newFilePath = path.join(outputDir, newFileName);

        // Replace keywords in the template
        let newContent = template
            .replace(/GamePathInsert/g, game.IframePath) // Remove hyphens from IframePath
            .replace(/GameImgInsert/g, game.image) // Update game image
            .replace(/GameNameInsert/g, game.name) // Update game name
            .replace(/CreatorNameInsert/g, game.creator); // Update creator name

        // Write the new file
        fs.writeFileSync(newFilePath, newContent);
        console.log(`Created: ${newFileName}`);
    }
});

// Clean up node_modules
const dir = path.join(__dirname, 'node_modules');

fs.rm(dir, { recursive: true, force: true }, (err) => {
    if (err) {
        console.error(`Error deleting node_modules: ${err.message}`);
    } else {
        console.log('node_modules deleted successfully.');
    }
});