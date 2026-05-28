const { MongoClient } = require('mongodb');

async function main() {
    if (!process.env.MONGODB_URI) {
        console.error('Error: MONGODB_URI environment variable is not set.');
        process.exit(1);
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const result = await client.db('todoapp').collection('todos').deleteMany({});
        console.log(`Deleted ${result.deletedCount} todos from database`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
