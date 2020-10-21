import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import { FaPen } from 'react-icons/fa';
import "./Data.css"


import Tab from '../components/layout/Tab';
import { isAutheticated, getUser } from '../auth/Helper'
import { getData } from './DataHelper'

const ViewData = ()=>{
    const [viewData, setViewData] = useState({
        values: [],
        error: "",
        loading: false,
        didRedirect: false,
        redirectToEditData: {},
        redirectToEditPage: false,
    });

    const { values, loading, didRedirect, redirectToEditPage, redirectToEditData } = viewData;

    const preload = () => {
        getData()
          .then((response) => {
            setViewData({ ...viewData, values: response.data });
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        preload();
      }, []);

    // const handleChange = (name) => (event) => {
    //     setData({ ...data, error: false, [name]: event.target.value });
    // };

    const user = isAutheticated();

    const performRedirect = () => {
        console.log('performRedirect',viewData);
        if (didRedirect) {
            if (user.isAdmin === 1) {
                // console.log('performRedirect 1')
                return <Redirect to="/admin/dashboard" />;
            }
            else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if(redirectToEditPage) {
            // return <Redirect to="/editData" />;
            // return <Redirect to=({
            //     pathname: "/editData",
            //     state: { from: props.location }
            //     })
            // />
            return (
                <Redirect
                    to={{
                    pathname: "/editData",
                    state: { editData: viewData.redirectToEditData }
                    }}
                />
            )
        }
        // if (isAutheticated()) {
        //     return <Redirect to="/" />;
        // }
    };

    const setRedirectToEdit = (data) =>{
        console.log(viewData)
        setViewData({...viewData, redirectToEditPage: true, redirectToEditData: data })
        console.log(viewData)
    }

    const getDataTable = () => {
        return(
            <div className="mt-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>LightIntensity</th>
                        <th>pH</th>
                        <th>createdAt</th>
                        <th>createdBy</th>
                        <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {values.map(value =>{
                            return(
                                <tr id={value.id}>
                                    <td>{value.id}</td>
                                    <td>{value.temperature}</td>
                                    <td>{value.humidity}</td>
                                    <td>{value.lightIntensity}</td>
                                    <td>{value.pH}</td>
                                    <td>{value.createdAt}</td>
                                    <td>{value.createdBy}</td>
                                    <td><FaPen onClick={()=>{
                                        setRedirectToEdit({value});
                                    }} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }


    return(
        <div>
            <Tab />
            <div className="container-fluid">
                {getDataTable()}
                {performRedirect()}
            </div>
        </div>
    )
}
export default ViewData;