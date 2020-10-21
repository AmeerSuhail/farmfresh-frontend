const axios = require('axios');

export const addData = async (data) => {
    const { temperature, humidity, lightIntensity, pH, userName }=data;
    
    const url = 'http://localhost:1337/api/signin'
    // todo : api to add data in db
    return await axios.post(url,{temperature, humidity, lightIntensity, pH, userName},{headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }})
    .then(response=> {
        console.log('responseresponse',response);
        return(response.data); 
    })
    .catch(error=>{ 
        return{error:error.response.data.error};
    })
}


export const getData = async () => {
    // const { temperature, humidity, lightIntensity, pH, userName }=data;
    
    const url = 'http://localhost:1337/api/getData'
    // todo : api to add data in db
    console.log('getData in');

    return await axios.get(url,{headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }})
    .then(response=> {
        console.log('getData response',response);
        return(response.data); 
    })
    .catch(error=>{ 
        console.log('getData error',error);
        return{error:error.response.data.error};
    })
}