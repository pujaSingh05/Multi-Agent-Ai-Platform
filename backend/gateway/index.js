import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { proxyWithHeader } from './utils/proxyWithHeader.js';
import { getCurrentUser } from "./controllers/user_controller.js"
import protect from "./middleware/auth_middleware.js"
import morgan from "morgan"

dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(morgan("dev"))
app.use(cookieParser())


//Proxy requests to the auth service
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL))
//Proxy requests to the chat service
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE_URL))
app.use("/api/agent", protect, proxyWithHeader(process.env.AGENT_SERVICE_URL))
app.use("/api/billing", protect, proxyWithHeader(process.env.BILLING_SERVICE))
app.get('/api/me', protect, getCurrentUser);

app.get('/', (req, res) => {
    res.send('Welcome to the Gateway Server')
});

app.listen(port, () => {
    console.log(`Gateway server is running on port ${port}`);
});

