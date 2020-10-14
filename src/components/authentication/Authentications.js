import React from 'react';
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  let isAuthenticated = false;

  let token = localStorage.getItem('token');

  if (token === 'null' || token === null) {
    token = null;
    localStorage.removeItem('token');
  }

  if (token) {
    isAuthenticated = true;
  }

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === true ?
        <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  )
};
