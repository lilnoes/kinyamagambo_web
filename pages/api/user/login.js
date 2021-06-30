import withSession from "../../../lib/session";
import getDatabase from "../../../lib/database.js";
import bcrypt from "bcrypt";
async function handler(req, res) {
    const {username, password} = req.body;
    const db = await getDatabase();
    const collection = db.collection("users");
    const user = await collection.findOne({username: username});
    if(!user) return res.status(200).json({ status: 'error', data: "user not found" });
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(200).json({ status: 'error', data: "user not found" });
    req.session.set("user", user);
    await req.session.save();
    res.status(200).json({ status: 'done', data: "logged in successfully successfully" });
}

export default withSession(handler);
