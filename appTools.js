const fs = require('fs'); 
const path = require('path');


console.log("custom tools loaded")

function toDo_storeDataAsJSON(data) {
    fs.writeFile('appData.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File saved successfully!');
        }
    });
}

// Function to read data from a JSON file
async function toDo_readDataFromJSON() {

}


//IMAGES MODULE WIP//

//Function that reads the images folder and returns an array of image URLs
function getImageUrls(cwd) {
    console.log("getImageUrls called");
    const imagesDir = path.join(cwd, 'public', 'images');
    const files = fs.readdirSync(imagesDir);
    files.shift(); // Remove the first item if it's not an image (e.g., a README or other file)
    // Filter for image files (optional: adjust extensions as needed)
    console.log("files in images folder: ", files);
    const imageFiles = files.filter(file =>
        /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)
    );
    return imageFiles.map(file => `/images/${file}`);
}

//Function that creates an array of urls from the folder public/images



// Export the functions
module.exports = {
    toDo_storeDataAsJSON,
    toDo_readDataFromJSON,
    getImageUrls
};