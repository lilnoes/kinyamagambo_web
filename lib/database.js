const MongoClient = require("mongodb").MongoClient
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

const client = new MongoClient(url, { useUnifiedTopology: true });

export default async function getDatabase() {
    if (client.isConnected()) return client.db(dbName);
    await client.connect();
    return client.db(dbName);
}
//username index
// db.users.createIndex({username: 1}, {unique: true})

//email index
// db.users.createIndex({email: 1}, {unique: true})


//words index
// db.words.createIndex({word: 1}, {unique: true})

// search index
// db.words.createIndex({
//     "$**": "text",
// }, {
//     name: "textIndex",
//     weights: {
//         "word": 10,
//         "definitions.meanings.translations.tr": 10,
//         "definitions.meanings.translations.en": 10,
//         "definitions.meanings.translations.fr": 10,
//         "definitions.meanings.translations.sw": 10,
//         "definitions.meanings.meaning": 5,
//     }
// })