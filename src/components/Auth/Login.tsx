import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import babyfeet from '../../assets/babyfeet.jpg';
import logo from '../../assets/logo.png';
import Register from './Register';
// import RegisterInfant from './RegisterInfant';
import ReactDOM from 'react-dom';
import { isThisTypeNode } from 'typescript';


type AcceptedProps = {
    updateSessionToken: (newToken: string) => void;
};

type MyState = {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    registerToggle: boolean,
};

class Login extends Component<AcceptedProps, MyState> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            email: '',
            password: '', 
            firstname: '',
            lastname: '',
            registerToggle: false,
        }
    }

    handleSubmit = (e: any) => {
        if (this.state.email !== "" && this.state.password !== "") {
          e.preventDefault();
          fetch('http://localhost:3000/user/login', {
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

      handleSubmitRegister = () => {
        //event.preventDefault();
        
        // fetch('http://localhost:3000/infant/register', {
        //     method: 'POST',
        //     body: JSON.stringify({babyname: this.state.babyname, parentname: this.state.parentname, contactnumber: this.state.contactnumber}),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }).then(
        //     (response) => response.json()
        // ).then((data) => {
        //     ///this.setState({updateToken: data.sessionToken})
        //     //localStorage.setItem('token', data.sessionToken);
        //     console.log(data);
        //     //console.log(localStorage.getItem('token'));
        // })
            
        fetch('http://localhost:3000/user/create/1', {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password, firstname: this.state.firstname, lastname: this.state.lastname}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            ///this.setState({updateToken: data.sessionToken})
            console.log('in here');
            //localStorage.setItem('token', data.sessionToken)
            
           // console.log(localStorage.getItem('token'))
           
        });
        
    }

      
    AddRegister = () => {
        console.log(this.state.registerToggle)
        return (
            (!this.state.registerToggle ? <></> :
            <div className='d-flex justify-content-center'>
            <Form onSubmit={this.handleSubmitRegister}>
            <table className='mt-5'>
            <tr>
                    <td><label className="Login-Label d-flex justify-content-end">Admin&nbsp;</label></td>
                    <td><label className="Login-Label d-flex justify-content-begin">Information</label></td>
                    
               </tr>
               <tr>
                    <td><label className="Login-Label d-flex justify-content-end">Email:&nbsp;</label></td>
                    <td><input type="email" placeholder="email" onChange={(e) => this.setState({email: e.target.value})}/></td>
               </tr>
               <tr>
                    <td><label className="Login-Label d-flex justify-content-end">Password:&nbsp;</label></td>
                    <td><input type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/></td>
                </tr>
               <tr>
                    <td><label className="Login-Label d-flex justify-content-end">First Name:&nbsp;</label></td>
                    <td><input type="text" placeholder="First Name" onChange={(e) => this.setState({firstname: e.target.value})}/></td>
               </tr>
               <tr>
                    <td><label className="Login-Label d-flex justify-content-end">Last Name:&nbsp;</label></td>
                    <td><input type="text" placeholder="Last Name" onChange={(e) => this.setState({lastname: e.target.value})}/></td>
               </tr>

              
           </table>
           <div className="d-flex justify-content-center">"
                <Button className="d-flex justify-content-center Login-Button mt-2" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'black', backgroundColor: 'white'}}>Submit</Button>
            </div>
           </Form>
           </div>
            )
        );
    };

    render(){
        return(
            <div style={{backgroundImage:`url(${babyfeet})`, backgroundSize: 'cover', backgroundPositionY: -300, backgroundRepeat: 'no-repeat', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>
                
                <div className="d-flex justify-content-center">
                    <Form id="submitOption" onSubmit={this.handleSubmit}>
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
                            <div className="d-flex justify-content-center">
                                <Button className="Do-Button mt-2 mb-5" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'black', backgroundColor: 'white'}}>Login</Button>
                            </div>
                    </Form>
                </div>
                    
                    <div className="d-flex justify-content-center Login-Label mt-5">
                        Not a user?
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="Do-Button mt-2" onClick={() => this.setState({registerToggle: true})} type='button'>Sign Up!</button>
                        
                    </div>
                    {this.AddRegister()}
                    
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