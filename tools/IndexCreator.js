const fs = require('fs');
const path = require('path');

// Paths
const templatePath = path.resolve('indextemplate.html');
const gamesJsonPath = path.resolve('games.json');
<<<<<<< HEAD
const outputPath = path.join('index.html');

// Load the template and games.json
=======
const outputPath = path.resolve('index.html');

// Ensure output directory exists
if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

// Load template and games data
>>>>>>> 5092412 (1)
const template = fs.readFileSync(templatePath, 'utf8');
const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

// Generate Hot Games HTML
function generateHotGames(games) {
<<<<<<< HEAD
  return games
    .filter((game) => game.hot === 1)
    .map(
      (game) => `
        <a href="${game.path}">
          <div class="SmallBox">
            <img src="${game.image.startsWith('/') ? game.image.substring(1) : game.image}" alt="${game.name}" width="80" height="80" class="Box-Image" />
            <div class="text-container">
              <h3 class="GameName">${game.name}</h3>
              <h3 class="AuthorName">${game.creator}</h3>
            </div>
          </div>
        </a>
      `
    )
    .join('');
=======
    return games
        .filter((game) => game.hot === 1)
        .map(
            (game) => `
            <a href="${game.path}">
                <div class="SmallBox">
                    <img src="${game.image}" alt="${game.name}" width="80" height="80" class="Box-Image" />
                    <div class="text-container">
                        <h3 class="GameName">${game.name}</h3>
                        <h4 class="AuthorName">${game.creator}</h4>
                    </div>
                </div>
            </a>
        `
        )
        .join('');
>>>>>>> 5092412 (1)
}

// Generate Game List HTML
function generateGameList(games) {
<<<<<<< HEAD
  return games
    .filter((game) => game.visible === 1)
    .map(
      (game) => `
        <a href="${game.path}" alt="${game.name}">
          <img src="${game.image}" alt="${game.name}" width="150" height="150" class="GameImgs" />
        </a>
      `
    )
    .join('');
=======
    return games
        .filter((game) => game.visible === 1)
        .map(
            (game) => `
            <a href="${game.path}" alt="${game.name}">
                <img src="${game.image}" alt="${game.name}" width="150" height="150" class="GameImgs" />
            </a>
        `
        )
        .join('');
>>>>>>> 5092412 (1)
}

// Replace placeholders in the template
const hotGamesHTML = generateHotGames(gamesData.games);
const gameListHTML = generateGameList(gamesData.games);
const updatedHTML = template
<<<<<<< HEAD
  .replace('<div class="Boxes" id="Boxes"></div>', `<div class="Boxes" id="Boxes">${hotGamesHTML}</div>`)
  .replace('<div class="game-select" id="gameid"></div>', `<div class="game-select" id="gameid">${gameListHTML}</div>`)
  .replace('no follow', 'follow')
  .replace('no index', 'index');

// Write generated HTML to output/index.html
=======
    .replace('<div class="Boxes" id="Boxes"></div>', `<div class="Boxes" id="Boxes">${hotGamesHTML}</div>`)
    .replace('<div class="game-select" id="gameid"></div>', `<div class="game-select" id="gameid">${gameListHTML}</div>`);

// Write updated HTML to output
>>>>>>> 5092412 (1)
fs.writeFileSync(outputPath, updatedHTML);

console.log('✅ index.html generated successfully at /index.html');
