import React, { Component } from 'react';
import {Col, Row, Image, Table, Form, Button} from 'react-bootstrap';
// import babyfeet from '../../assets/babyfeet.jpg';
import logo from '../../assets/logo.png';
import lennyx from '../../assets/lennyx.jpg'

type AcceptedProps = {
  token: string | any,
}

type MyState = {
    care: string,
    type: string,
    amount: string,
    time: string,
    date: string,
};

class CareIndex extends React.Component<AcceptedProps, MyState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            care: 'Feeding',
            type: '',
            amount: '',
            time: '',
            date: '',
        }
    }

  
   
  handleSubmit = (e: any) => {
      console.log(this.state.time)
      if (localStorage.getItem('token')){
        e.preventDefault();
          fetch('http://localhost:3000/care/create', {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              'Authorization': this.props.token
            }),
            body: JSON.stringify({
              care: this.state.care,
              type: this.state.type,
              amount: this.state.amount,
              time: this.state.time,
              date: this.state.date,
            }),
          })
            .then((res) => {
              if (res.status !== 200) {
                throw new Error("Could not create this care");
              } else return res.json();
            })
            .then((data) => {
                console.log('here');
                // alert("Care created");
            })
            .catch((err) => alert(err));
        } else {
          alert("Care and Description cannot be blank");
        }
      };
       
      setDate = () => {
        let arr1 = Date().split(' ')
        let el
        return (
          arr1[0] + ' ' + arr1[1] + ' ' + arr1[2] + ' ' + arr1[3]
        )
      };

      setTime = () => {
        let arr1 = Date().split(' ')
        let arr2 = arr1[4].split(':');
        let hour = 0;
        let amPm = 'am';
        if (parseInt(arr1[4]) > 12) {
          hour = (parseInt(arr1[4]) - 12)
          amPm = 'pm'
        }
        return (
          hour + ':' + arr2[1] + ' ' + amPm
        )
      };


      // setTime2 = () => {
      //   const time2 = document.getElementById('time');
      //   time2.addEventListener('change', this.setTime);
      // }
   

    render(){
          return (
            <div style={{backgroundColor: '#C1DDD8', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>
                
                <Row>
                  <Col xs="10" className="d-flex justify-content-center">
                    <div style={{width: '50%'}}>
                    <Form onSubmit={this.handleSubmit}>
                    <Table style={{backgroundColor: 'white'}}>
                      <tbody>
                        <tr style={{backgroundColor: '#6EC4C5'}}>
                          <td colSpan={2} style={{textAlign: 'center'}}>New Care</td>
                        </tr>
                        <tr>
                          <td style={{width: '25%'}}><label htmlFor="care" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Care:&nbsp;</label></td>
                          <td>
                            <select name="care" id="care" style={{width: "90%"}} onChange={(e) => this.setState({care: e.target.value})}>
                              <option value="feeding">Feeding</option>
                              <option value="nap">Nap</option>
                              <option value="diapercange">Diaper Change</option>
                              <option value="medicine">Medicine</option>
                              <option value="note">Note / Other</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="type" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Description:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='type' name='type' style={{width: "90%"}} onChange={(e) => this.setState({type: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="amount" className="d-flex justify-content-end">Amount:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='amount' name='amount' style={{width: "90%"}} onChange={(e) => this.setState({amount: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="time" className="d-flex justify-content-end">Time:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' value={this.setTime()} id='time' name='time' style={{width: "90%"}} onChange={(e) => this.setState({time: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="date" className="d-flex justify-content-end">Date:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' value={this.setDate()} id='date' name='date' style={{width: "90%"}} onChange={(e) => this.setState({date: e.target.value})}></input>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button className="Login-Button mt-2 d-flex justify-content-center" type="submit">Create Care</Button>
                    </Form>
                    </div>
                  </Col>
                  <Col xs="2" className="d-flex justify-content-center">
                    <div>
                      <Image src={lennyx} style={{width: 200}}/>
                    </div>
                  </Col>
                </Row>


                {/* <div className="d-flex justify-content-center">
                    <h1>Care Index</h1>
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
               </div> */}
            </div>
        )
    }
}

export default CareIndex;


// import React, { Component } from 'react';
// import {Container, Button, Form, Navbar, NavItem, Image} from 'react-bootstrap';


// type Data = {
//     currentToken: string,
// };

// class CareIndex extends React.Component<{}, Data>{
//     constructor(props: {}){
//         super(props)
//         this.state = {
//             currentToken: '',

//         }
//     }

//    currentToken = localStorage.getItem('token');

//    test = <div>hello<div>hello</div></div>
   
       
   
   

//     render(){
//         return (
//             <div>
//                 {this.currentToken}
//                 {this.test} 
//             </div>
//         )
//     }
// }

// export default CareIndex;