const fs = require('fs');
const path = require('path');

function main() {
    const dir = path.join(__dirname, '/node_modules');

fs.rm(dir, { recursive: true, force: true }, (err) => {
    if (err) {
        console.error(`Error deleting node_modules: ${err.message}`);
    } else {
        console.log('node_modules deleted successfully.');
    }
});
}

main()

module.exports = main;