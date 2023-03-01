import express from "express";
import fs from "fs/promises";

import {Writable} from "node:stream";
import querry from "../querry.js";

const route = express.Router();

class myWritable extends Writable{
    async _write(chunk, encoding , callback){
        
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

const wstream = new myWritable();


route.get("/", (req,res)=>{

    res.render("./create/create");

});

route.post("/",async (req,res)=>{

    const {body:{firstName="john", lastName="doe", email="Johndoe@mail.com"}}= req;

    const arrayData = await querry("./files/names.json");

    const length = arrayData.push({firstName : firstName, lastName: lastName, email:email});

    arrayData[length-1].ID=length;
    wstream._write(arrayData);
    res.redirect("/create");

})



export default route