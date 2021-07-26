import withSession from "../../../../lib/session.js";
import getDatabase from "../../../../lib/database.js";
import bcrypt from "bcrypt";
import {ObjectID} from "mongodb";

async function handler(req, res) {
    const {word: _word} = req.query;
    console.log("deleteing", _word);
    const user = await req.session.get("user");
    const db = await getDatabase();
    const collection = db.collection("words");
    const word = await collection.deleteOne({word: _word});
    res.status(200).json({ status: 'done', data: {word: word}});
}

export default withSession(handler);
