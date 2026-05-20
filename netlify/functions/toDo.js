const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        const todos = JSON.parse(event.body);
        await client.connect();
        const collection = client.db('todoapp').collection('todos');
        await collection.deleteMany({});
        if (todos.length > 0) {
            await collection.insertMany(todos);
        }
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'toDo list saved to server!' })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    } finally {
        await client.close();
    }
};
