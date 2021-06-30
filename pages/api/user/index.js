import withSession from "../../../lib/session";
import getDatabase from "../../../lib/database.js";
import bcrypt from "bcrypt";

async function handler(req, res) {
    const user = await req.session.get("user");
    res.status(200).json({ status: 'done', data: user});
}

export default withSession(handler);
