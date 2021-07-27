import withSession from "../../../lib/session.js";
import getDatabase from "../../../lib/database.js";

async function handler(req, res) {
    const {word: search} = req.body;
    const db = await getDatabase();
    const collection = db.collection("sentences");
    const sentences = await collection.find({$text: {$search: search}}).toArray();
    res.status(200).json({ status: 'done', data: {sentences: sentences}});
}

export default withSession(handler);
