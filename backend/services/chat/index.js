import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'


dotenv.config()


const port = process.env.PORT || 8001
const app = express()
app.use(express.json())
app.use("/", router)


app.get('/', (req, res) => {
    res.send('hello from chat server')
});

app.listen(port, () => {
    console.log(`chat started ${port}`);
    connectDB()
});

