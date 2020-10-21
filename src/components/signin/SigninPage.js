import React, { useState } from 'react'

import {signin, authenticate, isAutheticated} from '../../auth/Helper'
import Base from '../layout/Base'
import { Redirect } from "react-router-dom";
import "./Signin.css"


const SigninPage = ()=>{
    // return(
    //     <div>Here in sign in page</div>
    // )
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    });

    const { email, password, error, loading, didRedirect } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then((response) => {
            //todo 
            if (response.error !== undefined) {
              setValues({ ...values, error: response.error, loading: false });
            } 
            else {
                // login here

                authenticate(response.data, () => {
                    setValues({
                    ...values,
                    didRedirect: true,
                    });
                });
            }
          })
          .catch(() => {
            console.log("signin request failed");
          });
    };

    const user = isAutheticated();

    const performRedirect = () => {
        console.log('performRedirect',user,didRedirect);
        if (didRedirect) {
            if (user.isAdmin === 1) {
                console.log('performRedirect 1')
                return <Redirect to="/admin/dashboard" />;
            }
            else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        // if (isAutheticated()) {
        //     return <Redirect to="/" />;
        // }
    };

    const loadingMessage = () => {
        return (
          loading && (
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          )
        );
    };

    const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                onChange={handleChange("email")}
                                value={email}
                                className="form-control"
                                type="email"
                            />
                        </div>
    
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                onChange={handleChange("password")}
                                value={password}
                                className="form-control"
                                type="password"
                            />
                        </div>
                        <div className="form-group">
                        <label className="text-light"></label>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                        Submit
                        </button>
                        </div>
                        {/* <hr></hr> */}
                        {/* <div className="text-center text-white"> */}
                        {/* <strong>New User? </strong>
                        <Link to="/signup">
                            <button className="btn btn-outline-info">SignUp</button>{" "}
                        </Link>{" "} */}
                        {/* </div> */}
                    </form>
                </div>
            </div>
        );
    };

    return (
    <Base
        title="Sign In"
        description=""
        className="container-fluid bg-dark p-4"
    >
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
    </Base>
    );
    // <signInForm></signInForm>
}

export default SigninPage;