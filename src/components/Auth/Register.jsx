import React, {Component, Redirect} from 'react';
import {Container, Button, Form, Navbar, NavItem, Image} from 'react-bootstrap';
import APIURL from '../../helpers/environment';
import babyfeet from '../../assets/babyfeet.jpg';
import logo from '../../assets/logo.png';


// type AcceptedProps = {
//     testProp: string,
//     optionalProp?: string
// };

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {temp: ""}
    }

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
            
        fetch(`${APIURL}/user/create/`, {
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
           return(
            <Redirect to="/login"/>
        )
        })
        
    }

    render(){
        return(
            <div style={{backgroundImage:`url(${babyfeet})`, backgroundSize: 'cover', backgroundPositionY: -300, backgroundRepeat: 'no-repeat', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>

                <div className="d-flex justify-content-center">
                <Form onSubmit={this.handleSubmitRegister}>
                <table className='mt-5'>
                   <tr>
                       <td col="2">Admin Information</td>
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
               <Button className="Login-Button mt-2" type="submit">Register</Button>
               </Form>
            </div>
        </div>
        )
    }
}

export default Register;