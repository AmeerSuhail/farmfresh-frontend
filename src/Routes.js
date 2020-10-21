import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import Signin from './components/signin/SigninPage'
import AdminRoute from './auth/AdminRoute'
import AdminPage from './components/admin/AdminPage'
import UserRoute from './auth/UserRoute'
import UserPage from './components/user/UserPage'
import UserAddData from './components/user/UserAddData'
import ViewData from './data/ViewData'
import EditData from './data/EditData'



function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" exact component={HomePage} />
            <Route exact path="/signin" exact component={Signin} />
            <UserRoute exact path="/user/dashboard" exact component={UserPage} />
            <UserRoute exact path="/addData" exact component={UserAddData} />
            <UserRoute exact path="/viewData" exact component={ViewData} />

            <AdminRoute exact path="/admin/dashboard" exact component={AdminPage} />
            <AdminRoute exact path="/editData" exact component={EditData} />
            {/* <AdminRoute exact path="/editData" render={(props) => <EditData props={props}/>}/> */}

            {/* <AdminRoute exact path="/editData"  EditData() }/> */}

            
            <Route path="*" exact component={HomePage} />
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;