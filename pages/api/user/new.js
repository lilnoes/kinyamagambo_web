import withSession from "../../../lib/session";
import getDatabase from "../../../lib/database.js";
import bcrypt from "bcrypt";
async function handler(req, res) {
    const {name, surname, username, email, password} = req.body;
    const db = await getDatabase();
    const collection = db.collection("users");
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    await collection.insertOne({name, surname, username, email, password: hash})
    res.status(200).json({ status: 'done', data: "user registered successfully" });
}

export default withSession(handler);
