const axios = require('axios');


export const signin = async(user) => {
    const {email,password}=user;
    
    const url = 'http://localhost:1337/api/signin'
    return await axios.post(url,{email,password},{headers: {
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
};

export const getUser = async() => {
    // nt in use now
    const local=JSON.parse(localStorage.getItem("user"));
    return local;
    // return await axios.get(`${API}/user/${local.user._id}`,{headers: {
    //     "Authorization":`Bearer ${local.token}`
    // }})
    // .then(response=> {
    //  return((response.data));
    // })
    // .catch(error=>{ 
    //   return{error:error.response.data.error};
    // })
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", (JSON.stringify(data)));
      next();
    }
};

export const signout = next => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      next();
  
    //   return fetch(`${API}/signout`, {
    //     method: "GET"
    //   })
    //     .then(response => console.log("signout success"))
    //     .catch(err => console.log(err));
    }
};

export const isAutheticated = () => {
  
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("user")) {
      
      const user=( JSON.parse(localStorage.getItem("user")));
      console.log('isAutheticated user', user)
      return (user)
    } else {
      return false;
    }
};