const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies.sessionId;
        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const session = await redis.get(`session-${sessionId}`)
        if (!session) {
            return res.status(401).json({ message: 'Session expires' });
        }

        req.user = JSON.parse(session);
        next();

    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error ${error}` });
    }
}

export default protect;