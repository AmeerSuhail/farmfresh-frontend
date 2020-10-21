import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Tab from '../components/layout/Tab';
import { isAutheticated, getUser } from '../auth/Helper'
import "./Data.css"

const EditData = (props)=>{

    const editData = props.location.state.editData.value;

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

    useEffect(() => {
    setData({...editData});
    }, []);

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

    const onUpdate= ()=>{

    }

    const editDataForm = () => {
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
                  <button onClick={onUpdate} className="btn btn-success btn-block">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
    };
    
    return(
        <div>
            <Tab />

            <div className="container-fluid bg-dark data-container">
                {editDataForm()}
                {performRedirect()}
            </div>
        </div>
    )
}
export default EditData;