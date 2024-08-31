import express from 'express';
import Customer from "../Models/Loginmodel.js"

const router = express.Router();

// ROUTE: Fetch Donation Information
router.get('/', async (req, res) => {
    try {
        const donations = await Customer.find({}).select('donation_title donation_description goal_amount current_amount total_amount_gathered current_donators'); // Adjust based on schema
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

export default router;
