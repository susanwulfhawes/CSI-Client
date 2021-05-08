import React, {Component} from 'react';
import {Button, Form, Navbar, NavItem} from 'react-bootstrap';
import babyfeet from '../../assets/babyfeet.jpg';
import logo from '../../assets/logo.png';
import Register from './Register';
// import RegisterInfant from './RegisterInfant';
import ReactDOM from 'react-dom';
import APIURL from '../../helpers/environment';


type AcceptedProps = {
    updateSessionToken: (newToken: string) => void;
};

type MyState = {
    email: string,
    password: string,
};

class Login extends Component<AcceptedProps, MyState> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            email: '',
            password: '', 
        }
    }

    handleSubmit = (e: any) => {
        if (this.state.email !== "" && this.state.password !== "") {
          e.preventDefault();
          fetch(`${APIURL}/user/login`, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
            }),
          })
            .then((res) => {
              if (res.status !== 200) {
                throw new Error("Wrong credentials or user does not exist");
              } else return res.json();
            })
            .then((data) => {
                console.log('here');
              this.props.updateSessionToken(data.sessionToken);
              console.log("User successfully logged in");
            })
            .catch((err) => alert(err));
        } else {
          alert("Email and/or Password cannot be blank");
        }
      };
    

    render(){
        return(
            <div style={{backgroundImage:`url(${babyfeet})`, backgroundSize: 'cover', backgroundPositionY: -200, backgroundRepeat: 'no-repeat', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>
                <Navbar  className="d-flex justify-content-end" fixed='top'>
                   
                    <NavItem>Care</NavItem>
                    <NavItem className='ml-3'>Profile</NavItem>
                    <NavItem className='ml-3'>Admin</NavItem>
                    <NavItem className='ml-3'>Logout</NavItem>
                </Navbar>
                <Form id="submitOption" onSubmit={this.handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <table className='mt-5'>
                            <tr>
                                <td><label className="Login-Label d-flex justify-content-end">Email:&nbsp;</label></td>
                                <td><input type="email" placeholder="email" onChange={(e) => this.setState({email: e.target.value})}/></td>
                            </tr>
                            <tr>
                                <td><label className="Login-Label d-flex justify-content-end">Password:&nbsp;</label></td>
                                <td><input type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/></td>
                            </tr>
                            
                        </table>
                    </div>
                    <Button className="Login-Button mt-2" type="submit">Login</Button>
                </Form>
                {/* <Test /> */}
                <div id="toggleSubmit">

                </div>
                <Register/>
                {/* <RegisterInfant/> */}
            </div>
        )
    }
}

export default Login;

const Test = function () {
    return (
        <div>
            <h1>Test Components</h1>
            
        </div>
    );
};