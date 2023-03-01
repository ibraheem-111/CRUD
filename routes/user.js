// import render from "ejs";
import express from "express";
import querry from "../querry.js";
import Writable from "stream";
import fs from "fs/promises"
import updateid from "../updateid.js";

const route = express.Router()

class myWritable extends Writable{
    async _write(chunk, encoding , callback){
        // console.log(typeof(chunk));
        const fileHandle = await fs.open("./files/names.json","w");
        const wr = fileHandle.write(JSON.stringify(chunk));

        wr.then(()=>{
            res.send(201);
        })

        .catch((err)=>{
            console.log(err, "error in write file");
        })
    }
}

const w = new myWritable;

route.get("/", async (req, res)=>{
    const arr = await querry();

    res.json(arr);

})

route.get("/delete",(req,res)=>{
    res.render("./user/delete.ejs");

})

route.post("/delete", async (req,res)=>{
    const {body:{ID}}=req;
    const dataArray =await querry();
    let remainingElementsBefore = dataArray.splice(0,ID);
    let remainingElementsAfter = dataArray.splice(1);
    const newDataArray = remainingElementsBefore.concat(remainingElementsAfter);
    updateid(newDataArray);

    w._write(newDataArray);

    res.redirect("/user")

})


route
    .route("/update")
    .get((req,res)=>{
        res.render("../views/user/updatedata.ejs");
    })

    .post(async (req,res)=>{
        const arr = await querry();
        const n = req.body.ID -1;
        if(n<arr.length){
            const n = req.body.ID -1;
            if(req.body.firstName!=1){
                arr[n].firstName=req.body.firstName;
            }else {
                res.send("The values of first Name, last Name and email cannot be 1");}
            if(req.body.lastName!=1){
                arr[n].lastName=req.body.lastName;
            }else {
                res.send("The values of first Name, last Name and email cannot be 1");}
            if(req.body.email!=1){
                arr[n].email=req.body.email;
            }else{
                res.send("The values of first Name, last Name and email cannot be 1");
            }
        }else{
            res.send(`The ID must be less than or equal to ${arr.length}`)
        }
        w._write(arr);
    
        res.redirect("/user");
    })



route
    .route("/:id")
    .get(async (req,res)=>{
        const id = req.params.id;
        const arr = await querry();
        const l = arr.length;
        
        if (id<=l){
            res.json(arr[id-1]);
        }else{
            res.send(`Invalid ID, the ID must be a number equal to or smaller than ${l}`);
        }
        
        // con
    })

export default route