import fs from "fs/promises";

export default async function querry(path="./files/names.json", id){
    try{
        let info = [];
        // let f = false;
        const arr = await fs.stat(path, async (err,stat)=>{

            // if(err){
            //     console.log(err)
            // }else{
            //     const fileHandle = await fs.open(path, "r");
            //     info = JSON.parse(await fileHandle.readFile(options.encoding("utf-8")));

            //     console.log(info);

            // }
                

        }).then(async ()=>{
            const fileHandle = await fs.open(path, "r");
            //console.log(await fileHandle.readFile("utf-8"))
            //console.log(typeof(await JSON.parse(await fileHandle.readFile("utf-8"))))
            const arr = await info.concat (await JSON.parse(await fileHandle.readFile("utf-8")));
            // console.log(arr);
            
            console.log("inside .then");
            fileHandle.close();
            return arr;

        })
        .catch((err)=>{

            if(err.code= "ENOENT"){
                fs.writeFile(path, JSON.stringify(info));
            }

            console.error(err,"from catch statement");

        })
        
        console.log(arr)
        return arr

    // return info
    }

    catch{
        console.log("Something went wrong in querry");
    }
    
}

querry()