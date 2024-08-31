import express from "express";
import Customer from "../Models/Loginmodel.js";
const projectRoutes = express.Router();
import mongoose from "mongoose";

projectRoutes.get("/", async(req,res)=>{
    try{
        for(var elem of Object.keys(req.query)){
            if(Number(req.query[elem])){
                req.query[elem] = Number(req.query[elem])
            }
        }
        const data = await Customer.aggregate([{$match:{...req.query}},{$project:{"student_password":0, "student_email":0}}]);
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})


projectRoutes.get("/:id", async(req,res)=>{
    try{
        // console.log(req.params.id);
        let data;
    if(req.params.id.length == 24)data = await Customer.aggregate([{$match:{'_id':new mongoose.Types.ObjectId(req.params.id)}},{$project:{"student_password":0, "student_email":0}}]);
    else data = await Customer.aggregate([{$match:{'_id':Number(req.params.id)}},{$project:{"student_password":0, "student_email":0}}]);

        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
})
export default projectRoutes;