import withSession from "../../../lib/session";
import getDatabase from "../../../lib/database.js";
import {ObjectID} from "mongodb";
import bcrypt from "bcrypt";

async function handler(req, res) {
    const {word: definition} = req.body;
    const user = await req.session.get("user");
    definition["_id"] = new ObjectID();
    const db = await getDatabase();
    const collection = db.collection("words");
    const existingWord = await collection.findOne({word: definition.word});
    if(!existingWord) await collection.insertOne({
        word: definition.word,
        meanings: [],
        count: 1,
        isesengura: definition.isesengura
    });
    console.log(definition);
    res.status(200).json({ status: 'done', data: "done"});
}

export default withSession(handler);
