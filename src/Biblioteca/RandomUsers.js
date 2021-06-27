export async function getData(contactosImportados) {
    try{
        const resultado= await fetch('https://randomuser.me/api/?results=' + contactosImportados);
        const json = await resultado.json();
        return json.results;
    }catch(e) {
        console.log("ERR: " + e);
    }
}


    
    