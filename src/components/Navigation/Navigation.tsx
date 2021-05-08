import React, {Component} from 'react';
import {Container, Button, Form, Nav, Navbar, NavItem, NavbarBrand, Image} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './Navigation.css';
import jwt_decode from 'jwt-decode';

// type AcceptedProps = {
//     testProp: string,
//     optionalProp?: string
// };

export interface NavigationProps {
    isAdmin: string,
    sessionToken: string,
}

class Navigation extends Component<{}, NavigationProps> {
    constructor(props: {}) {
        super(props);
        this.state = { 
            isAdmin: '',
            sessionToken: '',
        }
    }


    clearToken =() => {
        localStorage.clear();
        this.setState({sessionToken: ''});
        window.location.reload();
      };

      getUserRole = () => {
          let token: string | any = localStorage.getItem('token');
          //console.log(jwt_decode(token));
          let jwtString: string | any = jwt_decode(token);
          console.log(jwtString.id)
          fetch(('http://localhost:3000/user/userbyid/' + jwtString.id), {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              'Authorization': token
            }),
        })
            .then((res) => (res.json()))
            .then((data) => {
                this.setState({isAdmin: data.role})
            })
            
      };


    componentDidMount(){
      this.getUserRole();
    }


    render(){
        // let isAdmin : string | any = this.getUserRole();
        // console.log('isadmin', isAdmin);
        console.log('isadmin', this.state.isAdmin)
        return(
            <Navbar color="faded" expand="md" fixed="top">
            
                <Nav className="ml-auto " navbar >
                    <NavItem className="ml-2 " >
                        {localStorage.getItem('token') ? <Button href="/careindex" style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}}>Care</Button> : <></>}
                    </NavItem>
                    {/* <NavItem className="ml-2">
                            {(localStorage.getItem('token') ? this.getUserRole) ? <Button href="/createinfant" style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}} >Create Infant</Button> : <></>}
                    </NavItem> */}
                    <NavItem className="ml-2">
                            {localStorage.getItem('token') && this.state.isAdmin === '1' ? <Button href="/createinfant" style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}} >Create Infant</Button> : <></>}
                    </NavItem>
                    <NavItem className="ml-2">
                            {localStorage.getItem('token') && this.state.isAdmin === '1' ? <Button href="/roleusers" style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}} >Create Helpers</Button> : <></>}
                    </NavItem>
                    <NavItem className="ml-2">
                            {localStorage.getItem('token') ? <Button onClick={this.clearToken} style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}} >Log Out</Button> : <></>}
                    </NavItem>
                    
                </Nav>
        </Navbar>
        )
    };
}

export default Navigation;