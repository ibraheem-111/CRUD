import express from "express";
// import querry from "./querry.js";

const app = express();

app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs");

app.listen(4000);

app.get('/', (req,res)=>{

    res.send("CRUD application, navigate to <br/>1. /create to create newfile<br/>2. /read t read existing file")

});

import create from "./routes/create.js";
import user from "./routes/user.js";

app.use("/create", create);
app.use("/user", user);
