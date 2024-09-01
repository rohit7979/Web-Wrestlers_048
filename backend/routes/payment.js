import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import Customer from "../Models/Loginmodel.js";
import mongoose from 'mongoose';
const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE: Create Payment Order
router.post('/order', async (req, res) => {
    const { amount, _id } = req.body;
    req.user = { ...req.user, donatee_id: _id };
    try {
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt ${Date.now()}`,
            payment_capture: '1'
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ data: order });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment order" });
        console.log('Error creating order:', error);
    }
});

router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, _id } = req.body;
    req.user = { ...req.user, donatee_id: String(_id) };

    try {
        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            let donation;
            console.log("Donatee id", req.user.donatee_id, req.user.donatee_id.length);

            if (req.user.donatee_id.length === 24) {
                donation = await Customer.findById(req.user.donatee_id).exec();
            } else {
                donation = await Customer.findOne({ '_id': Number(req.user.donatee_id) }).exec();
            }

            if (donation) {
                console.log('Donation updated successfully:');
                let data;

                if (req.user.donatee_id.length === 24) {
                    data = await Customer.findById(req.user.donatee_id, { student_password: 0, student_email: 0 }).exec();
                } else {
                    data = await Customer.findOne({ '_id': Number(req.user.donatee_id) }, { student_password: 0, student_email: 0 }).exec();
                }

                let user_name;

                if (req.user.id.length === 24) {
                    user_name = await Customer.findById(req.user.id, { student_name: 1 }).exec();
                } else {
                    user_name = await Customer.findOne({ '_id': Number(req.user.id) }, { student_name: 1 }).exec();
                }

                if (data && user_name) {
                    await Customer.updateOne(
                        { '_id': data._id },
                        {
                            $inc: { total_amount: amount, current_amount: amount },
                            $push: {
                                current_donators: {
                                    _id: data.current_donators.length + 1,
                                    donator_id: req.user.id,
                                    name: user_name.student_name,
                                    amount: amount
                                }
                            }
                        }
                    );

                    res.json({ message: "Payment Successfully" });
                } else {
                    res.status(404).json({ message: "Data or User not found" });
                }
            } else {
                console.log('Donation not found for ID:', req.user.donatee_id);
                res.status(404).json({ message: "Donation not found" });
            }
        } else {
            console.log('Invalid signature:', { expectedSign, receivedSignature: razorpay_signature });
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.error('Error during payment verification:', error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default router;