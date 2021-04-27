import React, { Component } from 'react';
import Login from './Login';
import Register from './Register'
import {Container, Button} from 'react-bootstrap';

class Auth extends React.Component{
    constructor(props: {}){
        super(props)
        this.state = {
            updateToken: '',
            showLogin: true,
        }
    }

    render(){
        return (
            <Container>                
                <div><br /><p>Not a user? <br /> <Button color="link" href="/Register">Sign up!</Button></p></div>
            </Container>
        )
    }
}

export default Auth;