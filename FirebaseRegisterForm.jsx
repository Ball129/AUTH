import React, {useContext} from "react";
import {Button, Container, Dimmer, Form, Grid, Header, Segment} from "semantic-ui-react";
import {AppContext} from "../../constance/appContext";
import AuthService from "./authService";
import FirestoreService from "../FIREBASE/firestoreService";
import _ from "lodash";


class FirebaseRegisterFormComponent extends React.Component {

    constructor(props) {
        super(props)
        // console.log(this.props.match)
        this.auth_service = new AuthService()
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
            .then(async response => {
                let firestore = this.props.db.firestore()
                let collection = firestore.collection("users");
                await FirestoreService.addDocument(collection, {username: email})
                this.props.setCurrentUser(response.user)
            })
            .catch(error => {
                alert(error);
                this.setState({
                    message: error.message,
                    loading: false
                })
            })
    }

    checkUsernameExisted = async () => {
        const {email} = this.state
        let firestore = this.props.db.firestore()
        let collection = firestore.collection("users");
        let query = collection.where("username", "==", email)
        await FirestoreService.checkIfExisted([query])
            .then((existed) => {
                if (existed) {
                    alert("Username Existed")
                    this.setState({loading: false})
                } else {
                    this.doRegister()
                }
            })
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
        this.checkUsernameExisted().then(() => {})
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
                                            <Button color='teal' size='large'>
                                                SignUp
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


export const FirebaseRegisterForm = (props) => {
    let appContext = useContext(AppContext);
    return <FirebaseRegisterFormComponent {...props} {...appContext}/>
};