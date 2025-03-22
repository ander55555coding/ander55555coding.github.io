const fs = require('fs');
const path = require('path');

// Function to rename child folders to remove uppercase letters and hyphens
function renameChildFolders(directory) {
    const childFolders = fs.readdirSync(directory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory()); // Get only directories

    childFolders.forEach(dirent => {
        const oldFolderName = dirent.name;
        const newFolderName = oldFolderName.toLowerCase().replace(/-/g, ''); // Convert to lowercase and remove hyphens
        const oldFolderPath = path.join(directory, oldFolderName);
        const newFolderPath = path.join(directory, newFolderName);

        if (oldFolderName !== newFolderName) {
            fs.renameSync(oldFolderPath, newFolderPath); // Rename the folder
            console.log(`Renamed: ${oldFolderName} -> ${newFolderName}`);
        }
    });
}

// Specify the directory to rename folders
const targetDirectory = './Game'; // Change this to your target directory
renameChildFolders(targetDirectory); 