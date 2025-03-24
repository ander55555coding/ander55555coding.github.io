const fs = require('fs');
const path = require('path');

// Function to convert games.json contents to lowercase and remove hyphens
function convertGamesJsonToLowerCaseAndRemoveHyphens() {
    const gamesFilePath = 'games.json';
    const gamesData = fs.readFileSync(gamesFilePath, 'utf8');
    const modifiedData = gamesData.toLowerCase().replace(/-/g, ''); // Convert to lowercase and remove hyphens
    fs.writeFileSync(gamesFilePath, modifiedData);
}

// Convert games.json to lowercase and remove hyphens at the start
convertGamesJsonToLowerCaseAndRemoveHyphens();

// Load games.json
const gamesData = JSON.parse(fs.readFileSync('../games.json', 'utf8'));

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

// Clean up node_modules
const dir = path.join(__dirname, 'node_modules');

fs.rm(dir, { recursive: true, force: true }, (err) => {
    if (err) {
        console.error(`Error deleting node_modules: ${err.message}`);
    } else {
        console.log('node_modules deleted successfully.');
    }
});

function renameFilesToLowerCase(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach(file => {
      const oldPath = path.join(directory, file);
      let newName = file.toLowerCase();
      newName = newName.replace(/-/g, ''); // Remove hyphens
      const newPath = path.join(directory, newName);

      // Check if the new name is different from the old name
      if (oldPath !== newPath) {
        fs.rename(oldPath, newPath, err => {
          if (err) {
            console.error(`Error renaming file ${file}:`, err);
          } else {
            console.log(`Renamed ${file} to ${newName}`);
          }
        });
      } else {
        console.log(`Skipped renaming ${file}, already in desired format.`);
      }
    });
  });
}

renameFilesToLowerCase("./assets/images");