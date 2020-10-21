import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./Helper";

const AdminRoute = ({ component: Component, ...rest }) => {
  console.log('rest',rest);
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() && isAutheticated().isAdmin === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
