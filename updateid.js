// import querry from "./querry.js";

export default async function updateid(arr){
    // const arr= await querry();
    arr.forEach((element,n) => {
        element.ID = n+1
    });
    return arr;
}


