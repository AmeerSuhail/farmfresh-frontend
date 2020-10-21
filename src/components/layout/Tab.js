import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../../auth/Helper";
import "./Layout.css"

const currentTab = (history, path) => {
  if (history && history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const currentTabforEdit = (history, path)=>{
    if (history && history.location.pathname === path) {
        return { color: "#2ecc72" };
    } else {
    return { color: "#696969" };
    }
}

const Tab = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
        {isAutheticated() && isAutheticated().isAdmin === 0 && (
            <Fragment>
                <li className="nav-item">
                    <Link
                    // todo
                        style={currentTab(history, "/user/dashboard")}
                        className="nav-link"
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        style={currentTab(history, "/addData")}
                        className="nav-link"
                        to="/addData"
                    >
                        Add Data
                    </Link>
                </li>

            </Fragment>

            
        )}
        {isAutheticated() && isAutheticated().isAdmin === 1 && (
            
            <Fragment>
            <li className="nav-item">
            <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
            >
                Dashboard
            </Link>
            </li>

            <li className="nav-item">
                <Link
                    style={currentTab(history, "/addData")}
                    className="nav-link"
                    to="/addData"
                >
                    Add Data
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    style={currentTab(history, "/viewData")}
                    className="nav-link"
                    to="/viewData"
                >
                    View Data
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    // style={currentTab(history, "/editData")}
                    // pointer-events:none
                    style={currentTabforEdit(history, "/editData")}
                    className="nav-link edit-link"
                    to="/editData"
                >
                    Edit Data
                </Link>
            </li>

        </Fragment>
        )}
        {!isAutheticated() && (
            <Fragment>
            <li className="nav-item">
                <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
                >
                Sign In
                </Link>
            </li>
            </Fragment>
        )}
        {isAutheticated() && (
            <li className="nav-item">
            <span
                className="nav-link text-warning"
                onClick={() => {
                signout(() => {
                    history.push("/");
                });
                }}
            >
                Signout
            </span>
            </li>
        )}
    </ul>
  </div>
);

export default withRouter(Tab);