import React from "react";
import {Redirect, Route} from 'react-router-dom';

import AuthService from "../../service/security/auth.service";

export default function Rappel(props) {
    const isAuth = !!AuthService.getCurrentUser();
    const isExpired = AuthService.verifyTokenExpired();
    const currentRole = AuthService.getTokenDESC();
    const hasRequiredRole = props.requiredRole.includes(currentRole);

    if (isExpired) {  
        AuthService.logout();
        return (
            <Redirect to='/login'/>
        )
    }
    if (isAuth && hasRequiredRole && !isExpired) {  
        return (
            <Route path={props.path} component={props.component}/>
        )
    } else {
        return (
            <Redirect to='/'/>
        )
    }
}