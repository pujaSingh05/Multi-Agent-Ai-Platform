import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";


export const login = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = getAuth(app).verifyIdToken(token)
        const user = await User.findOne({ firebaseUid: (await decoded).uid });

        if (!user) {
            user = await User.create({
                firebaseUid: (await decoded).uid,
                name: (await decoded).name,
                email: (await decoded).email,
                avatar: (await decoded).picture
            })

            const sessionid = crypto.randomUUID()
            await redis.set(`session: ${sessionid}`, JSON.stringify({
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }, { EX: 60 * 60 * 24 * 7 })) // 7 days in secs

            res.cookie("session", sessionid, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in msec
            });
            return res.status(200).json({ message: "User created and logged in successfully", user });
        }
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const sessionid = req.cookies?.session;
        await redis.del(`session: ${sessionid}`);
        res.clearCookie("session");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error occurred while logging out:", error);
        res.status(500).json({ error: "Logout error" });
    }
}
