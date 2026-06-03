const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const imagesDir = path.join(__dirname, '../../public/images');
    const files = fs.readdirSync(imagesDir);
    const images = files
        .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
        .map(f => `/images/${f}`);

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(images)
    };
};



 