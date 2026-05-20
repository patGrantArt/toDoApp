const { MongoClient } = require('mongodb');

exports.handler = async () => {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const todos = await client.db('todoapp').collection('todos')
            .find({}).sort({ priority: 1 }).toArray();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todos)
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    } finally {
        await client.close();
    }
};
