import React, { useState, useEffect } from "react";
import Base from '../layout/Base';
import { isAutheticated, getUser } from "../../auth/Helper";
import { Link } from "react-router-dom";


const UserPage = ()=>{
    const [userData, setUserData] = useState({
        name: "",
        email: "",
    });
  const { name, email } = userData;

  const preload = () => {
    getUser()
      .then((response) => {
          console.log('getUser resp',response)
        setUserData({ ...userData, name: response.userName, email: response.email});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    preload();
  }, []);

    const userDetails = () => {
        return (
        <div className="card mb-4">
            <h4 className="card-header bg-dark text-white">User Information</h4>
            <ul className="list-group">
            <li className="list-group-item">
                <span className=" mr-2">Name : </span>
                {name}
            </li>
            <li className="list-group-item">
                <span className=" mr-2">Email : </span>
                {email}
            </li>
            </ul>
        </div>
        );
    };

    // return(
    //     <div>
    //         user page
    //     </div>
    // )
    const welcomeString = `Welcome ${name}`
    return (
        <Base
          title={welcomeString}
          description=""
          className="container-fluid bg-info  p-5"
        >
          <div className="row">
            {/* <div className="col-md-5 w-100 order-1 order-lg-1 mx-auto mb-5">{userLeftSide()}</div> */}
            <div className="col-md-7 w-100 order-2 order-lg-2 mx-auto my-auto">{userDetails()}</div>
          </div>
        </Base>
    );
}

export default UserPage;