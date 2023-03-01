

export default async function updateid(arr){
    
    arr.forEach((element,n) => {
        element.ID = n+1
    });
    return arr;
}


