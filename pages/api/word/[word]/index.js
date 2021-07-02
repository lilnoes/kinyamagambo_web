import withSession from "../../../../lib/session.js"
import getDatabase from "../../../../lib/database.js";
import bcrypt from "bcrypt";

async function handler(req, res) {
    const {word: search} = req.query;
    const db = await getDatabase();
    const collection = db.collection("words");
    const word = await collection.findOne({word: search});
    res.status(200).json({ status: 'done', data: {word: word}});
}

export default withSession(handler);
