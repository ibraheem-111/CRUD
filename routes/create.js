import express from "express";
import fs from "fs/promises";
// import fs from "fs";
import {Writable} from "node:stream";
import querry from "../querry.js";

const route = express.Router();
// const wstream =fs.createWriteStream("./files/name.txt")
// const wstream = stream.Writable();

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

const wstream = new myWritable();

// wstream.on("data" ,async (data)=>{

//     const fileHandle = fs.open("./files/name.json");
//     const wr = await fileHandle.appendFile(JSON.stringify(data));

//     wr.then(()=>{
//         console.log("File Write Successfull");
          
//     })

//     .catch((err)=>{
//         console.log(err, "error in write file");
//     })

// }); 

route.get("/", (req,res)=>{
    //res.sendStatus(200);
    res.render("./create/create");

});

route.post("/",async (req,res)=>{
    // let arr = [];
    // console.log(arr, "arr route post");

    const arr2 = await querry("./files/names.json");

    // console.log(await querry("./files/names.json"));
    // console.log(arr2, "arr2 in route post");
    console.log("Post request recieved")
    const d = arr2.push({firstName : req.body.firstName, lastName: req.body.lastName, email:req.body.email});
    arr2[d-1].ID=d;
    // console.log(typeof(arr));
    wstream._write(arr2);

    res.redirect("/create");

})



export default route