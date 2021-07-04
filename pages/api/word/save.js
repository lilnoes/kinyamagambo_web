import withSession from "../../../lib/session";
import getDatabase from "../../../lib/database.js";
import { ObjectID } from "mongodb";

async function handler(req, res) {
    const { word: definition } = req.body;
    const user = await req.session.get("user");
    definition["_id"] = new ObjectID();
    definition["userID"] = new ObjectID(user._id);
    definition["deleted"] = false;
    definition["verified"] = false;
    definition["date"] = new Date();
    definition["upvotes"] = 0;
    definition["downvotes"] = 0;
    const db = await getDatabase();
    const collection = db.collection("words");
    const existingWord = await collection.findOne({ word: definition.word });
    if (!existingWord) await collection.insertOne({
        word: definition.word,
        definitions: [],
        count: 1,
        isesengura: definition.isesengura
    });
    const res1 = await collection.updateOne({ word: definition.word, "definitions.userID": definition.userID}, {
        $set: {
            "definitions.$.meanings": definition.meanings,
            "definitions.$.isesengura": definition.isesengura,
        },
        $currentDate: {"definitions.$.date": true}
    });
    if (res1.result.nModified == 0) {
        var res2 = await collection.updateOne({ word: definition.word }, {
            $push: {
                "definitions": definition
            }
        })
        // console.log(res2.result);
    }
    // console.log(definition, res1.result);
    res.status(200).json({ status: 'done', data: "done" });
}

export default withSession(handler);
