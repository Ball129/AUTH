import React from "react";
import BaseRouter from "../../components/baseRouter";
import {Label} from 'semantic-ui-react'


class AuthRouter extends BaseRouter {

    renderLoginForm = () => { return <Label>Login</Label>};
    renderRegisterForm = () => { return <Label>Register</Label>};

    routes = [
        {
            'key': 'login_form',
            'path': '/login',
            'exact': false,
            'render': this.renderLoginForm
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