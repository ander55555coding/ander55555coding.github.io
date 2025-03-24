const { exec } = require('child_process');

const scriptPath = 'tools/Loader.sh';

exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
    }
    console.log(`Script output:\n${stdout}`);
});