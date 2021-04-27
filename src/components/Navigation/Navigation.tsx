import React, {Component} from 'react';
import {Container, Button, Form, Nav, Navbar, NavItem, NavbarBrand, Image} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './Navigation.css';

// type AcceptedProps = {
//     testProp: string,
//     optionalProp?: string
// };

class Navigation extends Component {
    

    render(){
        return(
            <Navbar color="faded" expand="md" fixed="top">
            
                <Nav className="ml-auto " navbar >
                    <NavItem className="ml-2 " >
                        {localStorage.getItem('token') ? <Button href="/careindex" style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}}>Care</Button> : <></>}
                    </NavItem>
                    <NavItem className="ml-2">
                            {localStorage.getItem('token') ? <Button href="/createinfant" style={{backgroundColor: '#3ec4c5', border: '3px solid #f2c2c2'}} >Create Infant</Button> : <></>}
                    </NavItem>
                    
                </Nav>
        </Navbar>
        )
    };
}

export default Navigation;