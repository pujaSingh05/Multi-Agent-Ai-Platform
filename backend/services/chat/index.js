import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from "./routes/chatRoute.js"


dotenv.config()


const port = process.env.PORT || 8002
const app = express()
app.use(express.json())
app.use("/api/chat", router)
app.use("/", router)


app.get('/', (req, res) => {
    res.send('hello from chat server')
});

app.listen(port, () => {
    console.log(`chat started ${port}`);
    connectDB()
});

