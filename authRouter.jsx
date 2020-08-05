import React from "react";
import BaseRouter from "../../components/baseRouter";
import {Label} from 'semantic-ui-react'
import {FirebaseLoginForm} from "./firebaseLoginForm";


class AuthRouter extends BaseRouter {

    renderRegisterForm = () => { return <Label>Register</Label>};

    routes = [
        {
            'key': 'login_form',
            'path': '/login',
            'exact': false,
            'component': FirebaseLoginForm
        },
        {
            'key': 'register_form',
            'path': '/register',
            'exact': false,
            'render': this.renderRegisterForm
        },
    ];
}

export default AuthRouter;