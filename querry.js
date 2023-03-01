import fs from "fs/promises";

export default async function querry(path="./files/names.json", id){
    try{
        let emptyArray = [];

        const arrayData = await fs.stat(path, async (err,stat)=>{


        }).then(async ()=>{
            const fileHandle = await fs.open(path, "r");
            const array = await emptyArray.concat (await JSON.parse(await fileHandle.readFile("utf-8")));
            fileHandle.close();
            return array;

        })
        .catch((err)=>{

            if(err.code= "ENOENT"){
                throw err.code(404);
            }
            console.error(err,"from catch statement");

        })
        
        return arrayData
    }

    catch{
        console.log("Something went wrong in querry");
    }
    
}

querry()