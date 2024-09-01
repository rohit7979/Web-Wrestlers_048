import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './configs/Db.js';
import userData from './routes/userData.js';
import loginrouter from './routes/Login.js';
import protect from './middlewares/auth.js';
import Otprouter from './routes/otprouter.js';
import projectRoutes from './routes/projectRoutes.js';
import postProject from './routes/postProject.js';
import donationRoutes from "./routes/donations.js"
import paymentRoutes from "./routes/payment.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/user",protect, userData);
app.use('/api',loginrouter);
app.use('/api', Otprouter);
app.use("/projects",projectRoutes);
app.use("/project",protect, postProject);
app.use('/api/donations', donationRoutes);
app.use('/api/payment',protect, paymentRoutes);

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
