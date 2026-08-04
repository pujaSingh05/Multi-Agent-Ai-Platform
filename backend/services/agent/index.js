import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/agentRoute.js'


dotenv.config()


const port = process.env.PORT || 8003
const app = express()
app.use(express.json())
app.use("/", router)


app.get('/', (req, res) => {
    res.send('hello from agent')
});

app.listen(port, () => {
    console.log(`agent started ${port}`);
    connectDB()
});

