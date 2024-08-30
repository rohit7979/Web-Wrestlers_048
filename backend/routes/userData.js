import { Router } from "express";
import Customer from "../Models/Loginmodel.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userData = Router();

userData.get("/", async(req, res)=>{
    try{
        let data;
        console.log(req.user.id);
        if(req.user.id.length == 24)data = await Customer.aggregate([{$match:{'_id':new mongoose.Types.ObjectId(req.user.id)}},{$project:{"_id":1,"student_password":1, "student_email":1, "student_name":1}}]);
        else data = await Customer.aggregate([{$match:{'_id':Number(req.user.id)}},{$project:{"_id":1,"student_password":1, "student_email":1, "student_name":1}}]);
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }

})

userData.post("/changePassword", async(req, res)=>{
    try{
        if(req.body.student_password){
            let data;
            req.body.student_password = await bcrypt.hash(req.body.student_password, 10);
            console.log(req.user.id);
            if(req.user.id.length == 24)data = await Customer.updateOne({'_id':new mongoose.Types.ObjectId(req.user.id)},{$set:{student_password:req.body.student_password}});
            else data = await Customer.updateOne({'_id':Number(req.user.id)},{$set:{...req.body}});
            res.json({status:"successful",...data});
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:"unsuccessful"});
    }
})

export default userData
