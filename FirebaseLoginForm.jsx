import React, {useContext} from "react";
import {Button, Container, Dimmer, Form, Grid, Header, Segment} from "semantic-ui-react";
import {AppContext} from "../../constance/appContext";
import AuthService from "./authService";
 import Path from "../../constance/paths"
import logger from "../../CORE/services";


class FirebaseLoginFormComponent extends React.Component {

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
            showPassword: false,
        }
    }

    togglePassword = e => {
        this.setState({showPassword: !this.state.showPassword})
    }

    onChange = e => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    onSubmit = e => {
        this.setState({loading: true})
        e.preventDefault()
        const {email, password} = this.state
        this.props.db.auth()
            .signInWithEmailAndPassword(email, password)
            // .then(response => {
            //     this.props.setCurrentUser(response.user)
            // })
            .catch(error => {
                alert(error);
                this.setState({
                    message: error.message,
                    loading: false
                })
            })
    }

    gotoRegister = () => {
        this.props.requestRedirect(Path.REGISTER)
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

                                        <Form.Field inline>
                                            <Button
                                                floated={'right'}
                                                icon={'eye'}
                                                color={'grey'}
                                                onClick={this.togglePassword}
                                            />
                                            <Form.Input
                                                fluid
                                                icon='lock'
                                                iconPosition='left'
                                                placeholder='Password'
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                name='password'
                                                onChange={this.onChange}
                                            />
                                        </Form.Field>

                                        <Form.Group inline>
                                            <Button color='teal' fluid size='large' onClick={this.onSubmit}>
                                                Login
                                            </Button>
                                            <Button color='teal' fluid size='large' onClick={this.gotoRegister}>
                                                Register
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Dimmer.Dimmable>
                            </Segment>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}


export const FirebaseLoginForm = (props) => {
    let appContext = useContext(AppContext);
    return <FirebaseLoginFormComponent {...props} {...appContext}/>
};