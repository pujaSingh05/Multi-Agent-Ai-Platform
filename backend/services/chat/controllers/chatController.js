export const createConversation = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        console.log("User ID from headers:", userId);
        const newConversation = new Consversation.create({
            userId: userId,
        })
        return res.status(200).json(conversation);
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const updateConversation = async (req, res) => {
    try {
        const { conversationId, title } = req.body;
        const updatedConversation = await Conversation.findByIdAndUpdate(
            conversationId,
            { title },
        );
        return res.status(200).json(updatedConversation);
    } catch (error) {
        console.error("Error updating conversation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const getConversations = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const conversations = await Consversation.find({
            userId: userId,
        });
        return res.status(200).json(conversations);
    } catch (error) {
        console.error("Error getting conversation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}




export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body;
        const message = await Message.create({
            conversationId: conversationId,
            role: role,
            content: content
        });
        return res.status(200).json(message);
    } catch (error) {
        console.error("Error saving message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        }).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order
        return res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting messages:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}