import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../model/userModel.js"
import redis from "../../../shared/redis/redis.js"
import crypto from "crypto"


export const login = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token)
        let user = await User.findOne({ firebaseUid: decoded.uid })

        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            })
        }

        const sessionid = crypto.randomUUID()
        await redis.set(`user-session-${user?._id}`, sessionid, "EX", 7 * 24 * 60 * 60) // 7 days in secs
        await redis.set(
            `session:${sessionid}`,
            JSON.stringify({
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                plan: user.plan,
                credits: user.credits,
                totalCredits: user.totalCredits,
                planExpiresAt: user.planExpiresAt
            }),
            "EX",
            7 * 24 * 60 * 60
        )

        res.cookie("session", sessionid, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in msec
        });
        return res.status(200).json({ message: "User created and logged in successfully", user });
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


export const updateUserPayment = async (req, res) => {
    try {
        const { plan, credits, userId } = req.body
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        user.plan = plan
        user.credits += credits
        user.totalCredits += credits
        user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        await user.save()

        const sessionId = await redis.get(`user-session-${user?._id}`)
        console.log("sessionId", sessionId)
        await redis.set(`session:${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            plan: user.plan,
            credits: user.credits,
            totalCredits: user.totalCredits,
            planExpiresAt: user.planExpiresAt
        }), "EX", 7 * 24 * 60 * 60)
        return res.status(200).json({ success: true })

    } catch (error) {
        console.error("Error updating user payment:", error)
        return res.status(500).json({ message: `update user payment error ${error}` })
    }
}

export const deductCredits = async (req, res) => {
    try {

        const { userId, agent } = req.body

        const COST = {

            chat: 1,

            search: 5,

            coding: 10,

            pdf: 10,

            ppt: 10,

            vision: 10
        }

        const user = await user.findById(userId)

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const requiredCredits = COST[agent] || 1;
        if (user.credits < requiredCredits) {
            return res.status(400).json({ message: "Not enough credits." })
        }

        user.credits -= requiredCredits
        await user.save()

        const sessionId = await redis.get(`user-session-${user?._id}`)
        console.log("sessionId", sessionId)
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            plan: user.plan,
            credits: user.credits,
            totalCredits: user.totalCredits,
            planExpiresAt: user.planExpiresAt
        }), "EX", 7 * 24 * 60 * 60)
        return res.status(200).json({ success: true, credits: user.credits })
    } catch (error) {
        return res.status(500).json({ message: `deduct credits error ${error}` })
    }
}