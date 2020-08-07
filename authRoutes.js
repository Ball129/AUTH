import React from "react";
import {Label} from 'semantic-ui-react'
import {FirebaseLoginForm} from "./FirebaseLoginForm";

export const renderRegisterForm = () => { return <Label>Register</Label>};

const AUTH_ROUTES = [
        {
            'key': 'login_form',
            'path': '/login/:name?',
            'exact': false,
            'component': FirebaseLoginForm
        },
        {
            'key': 'register_form',
            'path': '/register',
            'exact': false,
            'render': renderRegisterForm
        },
    ];
export default AUTH_ROUTES;