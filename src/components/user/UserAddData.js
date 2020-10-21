import React, { useState } from "react";
import Tab from '../layout/Tab';
import { addData } from '../../data/DataHelper'
import { isAutheticated, getUser } from '../../auth/Helper'
import { Redirect, Link } from "react-router-dom";
import "./User.css"

const UserAddData = ()=>{

    const [data, setData] = useState({
        temperature: "",
        humidity: "",
        lightIntensity: "",
        pH: "",
        error: "",
        loading: false,
        didRedirect: false,
      });

    const { temperature, humidity, lightIntensity, pH, loading, didRedirect } = data;

    const handleChange = (name) => (event) => {
        setData({ ...data, error: false, [name]: event.target.value });
      };

    
    const onSubmit = (event) => {
    event.preventDefault();
    setData({ ...data, error: false, loading: true });
    console.log('datadatadata',data)
    addData({ temperature, humidity, lightIntensity, pH, userName: getUser().userName })
        .then((response) => {
            // todo
        if (response.error !== undefined) {
            setData({ ...data, error: response.error, loading: false });
        } else {
            // authenticate(response, () => {
            setData({
                ...data,
                didRedirect: true,
            });
            // });
        }
        })
        .catch(() => {
        console.log("signin request failed");
        });
    };

    const user = isAutheticated();


    const performRedirect = () => {
        // console.log('performRedirect',user,didRedirect);
        if (didRedirect) {
            if (user.isAdmin === 1) {
                // console.log('performRedirect 1')
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

    const addDataForm = () => {
        return (
          <div className="row addForm">
            <div className="col-md-4 offset-sm-4 text-left addFormTable">
              <form>
                <div className="form-group mt-3">
                  <label className="text-light">Temperature in celcius :</label>
                  <input
                    onChange={handleChange("temperature")}
                    value={temperature}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label className="text-light">Humidity :</label>
                  <input
                    onChange={handleChange("humidity")}
                    value={humidity}
                    className="form-control"
                    type="text"
                  />
                </div>
    
                <div className="form-group">
                  <label className="text-light">Light Intensity :</label>
                  <input
                    onChange={handleChange("lightIntensity")}
                    value={lightIntensity}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label className="text-light">pH value :</label>
                  <input
                    onChange={handleChange("pH")}
                    value={pH}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="form-group mt-5">
                  <button onClick={onSubmit} className="btn btn-success btn-block">
                    Submit
                  </button>
                </div>

                {/* <button onClick={onSubmit} className="btn btn-success btn-block">
                  Submit
                </button> */}
              </form>
            </div>
          </div>
        );
      };
    
    return(
        <div>
            <Tab />
            <div className="container-fluid bg-dark user-container">
                {addDataForm()}
                {performRedirect()}
                {/* <div className="user-contain">here</div> */}
            </div>
        </div>
    )
}

export default UserAddData;