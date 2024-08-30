import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/Db.js';



const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.send("this is home route ");

});


const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        connectDB()
        console.log('mongo connected');
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (err) {
        console.log(err);
    }
})
