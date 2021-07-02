import withSession from "../../../../lib/session.js";
import getDatabase from "../../../../lib/database.js";
import bcrypt from "bcrypt";
import {ObjectID} from "mongodb";

async function handler(req, res) {
    const {word} = req.query;
    const user = await req.session.get("user");
    const db = await getDatabase();
    const collection = db.collection("words");
    const meaning = await collection.findOne({word: word, "definitions.userID": new ObjectID(user._id)}, {
        projection: {"definitions.meanings": 1}
    });
    res.status(200).json({ status: 'done', data: {meaning: meaning}});
}

export default withSession(handler);
