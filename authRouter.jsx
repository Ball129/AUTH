import Path from "../../constance/paths"
import React from "react";
import BaseRouter from "../../components/BaseRouter";
import {Label} from 'semantic-ui-react'


class AuthRouter extends BaseRouter {

    renderLoginForm = () => { return <Label>Login</Label>};
    renderRegisterForm = () => { return <Label>Register</Label>};

    routes = [
        {
            'key': 'login_form',
            'path': Path.LOGIN,
            'exact': false,
            'render': this.renderLoginForm
        },
        {
            'key': 'register_form',
            'path': Path.REGISTER,
            'exact': false,
            'render': this.renderRegisterForm
        },
    ];
}

export default AuthRouter;