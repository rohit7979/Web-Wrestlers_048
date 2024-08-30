import express from 'express';
import { emailSender, verifyOTP } from '../utils/service.js';

const Otprouter = express.Router();

Otprouter.post('/send-otp', emailSender);
Otprouter.post('/verify-otp', verifyOTP);
export default Otprouter;