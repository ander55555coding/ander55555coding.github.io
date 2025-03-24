const deleteNode = require('./tools/deleteNode');
const convertJson = require('./tools/ConvertJson');
const CreateGameFiles = require('./tools/CreateGameFiles');
const readline = require('readline');

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Do you want to execute the main function? (Y/N) ", (answer) => {
        if (answer.toLowerCase() === 'Y') {
            try {
                console.log("starting ConvertJson");
                convertJson();
                console.log("ConvertJson completed successfully.");
            } catch (error) {
                console.error(`Error during ConvertJson: ${error.message}`);
            }
            try {
                console.log("starting CreateGameFiles");
                CreateGameFiles();
                console.log("CreateGameFiles completed successfully.");
            } catch (error) {
                console.error(`Error during CreateGameFiles: ${error.message}`);
            }
            try {
                console.log("starting Node Deletes");
                deleteNode();
                console.log("Node Deletes completed successfully.");
            } catch (error) {
                console.error(`Error during Node Deletes: ${error.message}`);
            }
            console.log("All operations attempted.");
        } else {
            console.log("Execution canceled.");
        }
        rl.close();
    });
}

main()