import React, {useContext} from "react";
import {Button, Container, Dimmer, Form, Grid, Header, Segment} from "semantic-ui-react";
import {AppContext} from "../../constance/appContext";
import AuthService from "./authService";
import {Route, Switch} from "react-router";
 import Path from "../../constance/paths"
import {Handle404View} from "../../CORE/Handle404View";
import logger from "../../CORE/services";


class FirebaseRegisterFormComponent extends React.Component {

    constructor(props) {
        super(props)
        logger(this.props.match)
        this.authService = new AuthService()
        this.props.setCurrentLocation(this.props.match.path)
        this.state = {
            email: '',
            password: '',
            currentUser: null,
            message: '',
            loading: false,
        }
    }

    onChange = e => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    doRegister = () => {
        const {email, password} = this.state
        this.props.db.auth()
            .createUserWithEmailAndPassword(email, password)

            .catch(error => {
                alert(error);
                this.setState({
                    message: error.message,
                    loading: false
                })
            })
    }

    onSubmit = e => {
        this.setState({loading: true})
        e.preventDefault()
        this.doRegister()
    }

    render() {
        return (
            <Container>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column style={{maxWidth: 450}}>
                            <Header as='h2' color='teal' textAlign='center'>Log-in to your account
                            </Header>
                            <Segment stacked>

                                <Dimmer.Dimmable>
                                    <Dimmer active={this.state.loading} inverted/>
                                    <Switch>
                                        <Route exact path={this.props.match.path} render={() => {
                                            return (
                                                <Form size='large'>
                                                    <Form.Field>
                                                        <Form.Input
                                                            fluid
                                                            icon='user'
                                                            iconPosition='left'
                                                            placeholder='Username / E-mail'
                                                            name='email'
                                                            onChange={this.onChange}
                                                        />
                                                    </Form.Field>

                                                    <Form.Field>
                                                        <Form.Input
                                                            fluid
                                                            icon='lock'
                                                            iconPosition='left'
                                                            placeholder='Password'
                                                            type='password'
                                                            name='password'
                                                            onChange={this.onChange}
                                                        />
                                                    </Form.Field>

                                                    <Form.Group inline>
                                                        <Button color='teal' size='large' onClick={this.onSubmit}>
                                                            SignUp
                                                        </Button>
                                                    </Form.Group>
                                                </Form>
                                            )
                                        }}/>
                                        {/*TODO: Use PrivateRoute*/}
                                        <Route path={`${this.props.match.path}${Path.ACTIVATE}`} render={() => {
                                            return (
                                                <Form size='large'>
                                                    <Form.Field>
                                                        <Form.Button
                                                            color={"green"} fluid
                                                        >
                                                            Activate
                                                        </Form.Button>
                                                    </Form.Field>
                                                </Form>
                                            )
                                        }}/>
                                        <Route render={() => {
                                            return (
                                                <Handle404View
                                                    defaultPath={Path.REGISTER}
                                                />
                                            )
                                        }}/>
                                    </Switch>
                                </Dimmer.Dimmable>
                            </Segment>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}


export const FirebaseRegisterForm = (props) => {
    let appContext = useContext(AppContext);
    return <FirebaseRegisterFormComponent {...props} {...appContext}/>
};