const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function main() {
    if (!process.env.MONGODB_URI) {
        console.error('Error: MONGODB_URI environment variable is not set.');
        process.exit(1);
    }

    const dataPath = path.join(__dirname, '..', 'appData.json');
    const todos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log(`Found ${todos.length} todos in appData.json`);

    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const collection = client.db('todoapp').collection('todos');

        // Clear any existing data
        await collection.deleteMany({});

        // Insert all todos
        const result = await collection.insertMany(todos);
        console.log(`Successfully imported ${result.insertedCount} todos into MongoDB`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
