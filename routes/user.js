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
            console.log("File Write Successfull");
        })

        .catch((err)=>{
            console.log(err, "error in write file");
        })
    }
}

const w = new myWritable;

route.get("/", async (req, res)=>{
    const arr = await querry();
    
    // console.log(arr,"from user.js route.get '/' ")

    res.json(arr);

    // res.status(200).send("Hi");
})

route.get("/delete",(req,res)=>{
    res.render("./user/delete.ejs");

})

route.post("/delete", async (req,res)=>{
    const arr =await querry();
    let rem = arr.splice(0,req.body.ID-1);
    let rem1 = arr.splice(1);
    const narr = rem.concat(rem1);
    updateid(narr);

    w._write(narr);

    res.redirect("/user")

})

// route.post("/update/data",(req,res)=>{
    // const arr = querry();
    // const n = req.body.ID -1;
    // if(req.body.firstName!=1){
    //     arr[n].firstName=req.body.firstName;
    // }else {
    //     res.send("The values of first Name, last Name and email cannot be 1");}
    // if(req.body.lastName!=1){
    //     arr[n].lastName=req.body.lastName;
    // }else {
    //     res.send("The values of first Name, last Name and email cannot be 1");}
    // if(req.body.email!=1){
    //     arr[n].email=req.body.email;
    // }else{
    //     res.send("The values of first Name, last Name and email cannot be 1");
    // }

    // w._write(arr);

    // res.redirect("/user");
// })

route
    .route("/update")
    .get((req,res)=>{
        // res.render("../views/user/update.ejs");
        res.render("../views/user/updatedata.ejs");
    })
    // .post((req,res)=>{
    //     // res.render("../views/user/updatedata.ejs",{firstName:1},{lastName:1},{email:1},{ID:req.body.ID});
    //     res.render("../views/user/updatedata.ejs");
    // })
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