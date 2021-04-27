import React, {Component} from 'react';
import {Container, Button, Form, Navbar, NavItem, Image} from 'react-bootstrap';


// type AcceptedProps = {
//     testProp: string,
//     optionalProp?: string
// };

class RegisterInfant extends Component {
    constructor(props){
        super(props);
        this.state = {temp: ""}
        this.state = {token: ""}
    }

    handleSubmitRegisterInfant = () => {
        //event.preventDefault();
        
        fetch('http://localhost:3000/infant/register', {
            method: 'POST',
            body: JSON.stringify({babyname: this.state.babyname, parentname: this.state.parentname, contactnumber: this.state.contactnumber}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            ///this.setState({updateToken: data.sessionToken})
            //localStorage.setItem('token', data.sessionToken);
            console.log(data);
            //console.log(localStorage.getItem('token'));
        })
            
        // fetch('http://localhost:3000/user/create/1', {
        //     method: 'POST',
        //     body: JSON.stringify({email: this.state.email, password: this.state.password, firstname: this.state.firstname, lastname: this.state.lastname}),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }).then(
        //     (response) => response.json()
        // ).then((data) => {
        //     ///this.setState({updateToken: data.sessionToken})
        //     localStorage.setItem('token', data.sessionToken);
        //     console.log('in here');
        //     console.log(localStorage.getItem('token'));
        // })
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmitRegisterInfant}>
               <table>
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

                   <tr>
                       <td col="2">Infant Information</td>
                   </tr>
                   <tr>
                        <td><label className="Login-Label d-flex justify-content-end">Baby's Name:&nbsp;</label></td>
                        <td><input type="text" placeholder="Baby's Name" onChange={(e) => this.setState({babyname: e.target.value})}/></td>
                   </tr>
                   <tr>
                         <td><label className="Login-Label d-flex justify-content-end">Parent(s)' Full Name(s):&nbsp;</label></td>
                        <td><input type="text" placeholder="Last Name" onChange={(e) => this.setState({parentname: e.target.value})}/></td>
                   </tr>
                   <tr>
                        <td><label className="Login-Label d-flex justify-content-end">Contact Number:&nbsp;</label></td>
                        <td><input type="text" placeholder="Contact Number" onChange={(e) => this.setState({contactnumber: e.target.value})}/></td>
                   </tr>
               </table>
               <Button className="Login-Button mt-2" type="submit">Register</Button>
               </Form>
            </div>
        )
    }
}

export default RegisterInfant;