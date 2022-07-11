import React from 'react';
import { Route, Redirect } from "react-router-dom";

function GaurdedRoute({ component: Component, ...rest }) {
    const auth = localStorage.getItem('x-token');
    return (
        <Route {...rest} render={props => {
            if (!auth) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}

export default GaurdedRoute;
