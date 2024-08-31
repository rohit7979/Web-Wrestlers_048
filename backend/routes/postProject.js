import { Router } from "express";
import Customer from "../Models/Loginmodel.js";
import mongoose from "mongoose";
import multer from "multer"
import path from "path"
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "../user_media")
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})
const postProject = Router()


postProject.post("/update",async(req,res)=>{
    try{
        if((req.body.comments || req.body.payment_recive_option  || req.body.donation_deadline || req.body.total_amout || req.body.goal_amount || req.body.current_amount || req.body.donation_active_status || req.body.current_donators || req.body.donation_title || req.body.donation_discription || req.body.updates_on_donation || req.body.time_of_creation || req.body.media_images) && !req.body.student_email && !req.body.student_password && !req.body.student_password){
            let data;
            console.log(req.user.id);
            if(req.user.id.length == 24)data = await Customer.updateOne({'_id':new mongoose.Types.ObjectId(req.user.id)},{$set:{...req.body}});
            else data = await Customer.updateOne({'_id':Number(req.user.id)},{$set:{...req.body}});
            res.json({status:"successful",...data});
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(err){
        console.log(err);
        res.send(500);
    }
})

export default postProject;