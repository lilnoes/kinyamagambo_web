import withSession from "../../../lib/session";
import getDatabase from "../../../lib/database.js";
import bcrypt from "bcrypt";

async function handler(req, res) {
    res.status(200).json({ status: 'done', data: "done"});
}

export default withSession(handler);
