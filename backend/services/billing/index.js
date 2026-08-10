import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/billingRoute.js'


dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use("/", router)


app.get('/', (req, res) => {
    res.send('hello from billing')
});

app.listen(port, () => {
    console.log(`billing started at ${port}`);
    connectDB()
});

