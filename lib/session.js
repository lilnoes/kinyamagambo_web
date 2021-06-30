import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
    return withIronSession(handler, {
        password: process.env.IRON_PASSWORD,
        cookieName: process.env.IRON_COOKIE_NAME,
        // if your localhost is served on http:// then disable the secure flag
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    });
}