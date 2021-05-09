import * as React from 'react';
import logo from '../../assets/logo.png';
import {Button, Form, Table} from 'react-bootstrap';

export interface RoleUsersProps {
    token: string | any,
}
 
export interface RoleUsersState {
   temp: string, 
   role: string,
   email: string,
   password: string,
   firstname: string,
   lastname: string,
}
 
class RoleUsers extends React.Component<RoleUsersProps, RoleUsersState> {
    constructor(props: RoleUsersProps) {
        super(props);
        this.state = {
            temp : '',
            role: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
     };
    }

    handleSubmit = (e: any) => {
        if (localStorage.getItem('token')){
          e.preventDefault();
          let url:string = 'http://localhost:3000/user/create/' + this.state.role;
            fetch('http://localhost:3000/user/create/2', {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': this.props.token
              }),
              body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
              }),
            })
              .then((res) => {
                if (res.status !== 200) {
                  throw new Error("Could not create this care2");
                } else return res.json();
              })
              .then((data) => {
                //<CareIndex  token={localStorage.getItem('token')}/>
                  window.location.reload();
                  // alert("Care created");
              })
              .catch((err) => alert(err));
          } else {
            alert("Care and Description cannot be blank");
          }
        };
    render() { 
        return ( 
            <div style={{backgroundColor: '#C1DDD8', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>
                <div className='d-flex justify-content-center'>
                    <Form onSubmit={this.handleSubmit}>
                        <Table className='mb-3' width='80%' style={{border: '1px solid #ddd', backgroundColor: 'white', minWidth: 500}}>
                            <thead>
                                <tr style={{backgroundColor: '#6EC4C5', color: 'white'}}>
                                    <th colSpan={2} className='py-3'>Care Givers and Viewers</th>
                                    
                                </tr>

                            </thead>
                        <tbody className='Care-List' style={{backgroundColor: 'white'}}>
                    <tr>
                            <td>
                                <label className="Login-Label d-flex justify-content-end">Email:&nbsp;</label>
                            </td>
                            <td>
                                <input type="email" placeholder="email" onChange={(e) => this.setState({email: e.target.value})}/>
                            </td>
                   </tr>
                   <tr>
                        <td className="Login-Label d-flex justify-content-end">
                            <label>Password:&nbsp;</label>
                        </td>
                        <td>
                            <input type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/>
                        </td>
                    </tr>
                   <tr>
                        <td className="Login-Label d-flex justify-content-end"><label className="Login-Label d-flex justify-content-end">First Name:&nbsp;</label></td>
                        <td><input type="text" placeholder="First Name" onChange={(e) => this.setState({firstname: e.target.value})}/></td>
                   </tr>
                   <tr>
                        <td><label className="Login-Label d-flex justify-content-end">Last Name:&nbsp;</label></td>
                        <td><input type="text" placeholder="Last Name" onChange={(e) => this.setState({lastname: e.target.value})}/></td>
                   </tr>

                            <tr>
                                <td style={{width: '25%'}}><label htmlFor="role" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Role:&nbsp;</label>
                                </td>
                          
                                <td>
                                    <select name="role" id="role" style={{width: "90%"}} onChange={(e) => this.setState({role: e.target.value})}>
                                        <option value="0">-- Select Role --</option>
                                        <option value="2">Care Giver</option>
                                        <option value="3">Viewer</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                        
                        </Table> 
                        <div className="d-flex justify-content-center">
                <Button className="d-flex justify-content-center Login-Button mt-2" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'black', backgroundColor: 'white'}}>Create User</Button>
            </div>
                    </Form>
                </div>
            </div>
        )
}
}
 
export default RoleUsers;