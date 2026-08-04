import axios from "axios";
import { graph } from "../graph/graph.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationIdId } = req.body;
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId: conversationIdId,
            role: "user",
            content: prompt
        })

        const result = await graph.invoke({
            prompt: prompt,
            conversationId: conversationIdId
        })
        const response = result.aiResponse
        return res.status(200).json({ response });

    } catch (error) {
        return res.status(500).json({ message: `Error fetching agent: ${error.message}` });
    }
}