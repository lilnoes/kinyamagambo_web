const MongoClient = require("mongodb").MongoClient
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

const client = new MongoClient(url);

export default async function getDatabase(){
    if(client.isConnected()) return client.db(dbName);
    await client.connect();
    return client.db(dbName);
}