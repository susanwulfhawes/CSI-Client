import React, { Component } from 'react';
import {Container, Button, Form, Navbar, NavItem, Image} from 'react-bootstrap';
import babyfeet from '../../assets/babyfeet.jpg';
import logo from '../../assets/logo.png';
import APIURL from '../../helpers/environment';


type MyState = {
    babyname: string,
    parentname: string,
    contactnumber: string,
};

type AcceptedProps = {
    token: string | any,
}

class CreateInfant extends React.Component<AcceptedProps, MyState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            babyname: '',
            parentname: '',
            contactnumber: '',
        }
        console.log('helo', this.props.token);
    }

        
   
  handleSubmit = (e: any) => {
      console.log(this.props.token)
      if (localStorage.getItem('token')){
        e.preventDefault();
          fetch(`${APIURL}/infant/register`, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              'Authorization': this.props.token,
            }),
            body: JSON.stringify({
              babyname: this.state.babyname,
              parentname: this.state.parentname,
              contactnumber: this.state.contactnumber
            }),
          })
            .then((res) => {
              if (res.status !== 200) {
                throw new Error("Could not create baby's profile");
              } else return res.json();
            })
            .then((data) => {
                console.log('here');
                alert("Baby's profile created");
            })
            .catch((err) => alert(err));
        } else {
          alert("Email and/or Password cannot be blank");
        }
      };
       
   
   

    render(){
        return (
            <div style={{backgroundImage:`url(${babyfeet})`, backgroundSize: 'cover', backgroundPositionY: -200, backgroundRepeat: 'no-repeat', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>
                <div className="d-flex justify-content-center">
                <Form onSubmit={this.handleSubmit}>
               <table>
                   

                   <tr>
                    <td colSpan={2}>Baby's Information</td>
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
            </div>
        )
    }
}

export default CreateInfant;