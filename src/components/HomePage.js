import React from 'react';
import { Link } from "react-router-dom";
import { isAutheticated } from '../auth/Helper'


const HomePage = () => {
    const getButton = ()=>{
        // return  (  
        //     <Link to={"/signin"} className="btn  btn-success">Let's Get in</Link>
        // )
        if(isAutheticated()){
            if(isAutheticated().isAdmin===1){
                return(
                    <Link to={"/admin/dashboard"} className="btn btn-lg btn-primary">Go to Admin Dashboard</Link>
                )
            }
            else{
                return (
                    <Link to={"/user/dashboard"} className="btn  btn-primary">Go to User Dashboard</Link>
                )
            }
          }
          else{
                return  (  
                    <Link to={"/signin"} className="btn  btn-success">Let's Sign In</Link>
                    )
          }
    }

    return(
        <div id="home" className="container-fluid">
            <div className="row vh-100">
                <div className="col-lg-6 my-auto">
                    <img  className="my-auto" src="https://image.freepik.com/free-vector/people-library-flat-vector-illustration_74855-6607.jpg" alt="image">
                    </img>
                </div>
                <div className="col-lg-6 p4 my-auto">
                    <h3 className="text-center">
                    <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </i>
                    </h3>
                    <h3 className="text-center"> <i>-Pseudo</i></h3>
                    <h1 className="text-center my-auto">
                    {getButton()}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage;