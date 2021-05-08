import React, { Component } from 'react';
import {Col, Row, Image, Table, Form, Button} from 'react-bootstrap';
// import babyfeet from '../../assets/babyfeet.jpg';
import logo from '../../assets/logo.png';
import APIURL from '../../helpers/environment';
import lennyx from '../../assets/lennyx.jpg';
import CareList from './CareList';

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
          fetch(`${APIURL}/infant/register`, {
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
              //<CareIndex  token={localStorage.getItem('token')}/>
                window.location.reload();
                // alert("Care created");
            })
            .catch((err) => alert(err));
        } else {
          alert("Care and Description cannot be blank");
        }
      };
       
      setDate = () => {
        let arr1 = Date().split(' ')
        
        return (
          arr1[0] + ' ' + arr1[1] + ' ' + arr1[2] + ' ' + arr1[3]
        )
      };

      setTime = () => {
        
        let arr1 = Date().split(' ')
        let arr2 = arr1[4].split(':');
        
        let hour = parseInt(arr2[0]);
        let amPm = 'am';
        if (parseInt(arr2[0]) > 12) {
          hour = (parseInt(arr2[0]) - 12)
          amPm = 'pm'
        }
        return (
          hour + ':' + arr2[1] + ' ' + amPm
        )
      };

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
                        <tr style={{backgroundColor: '#6EC4C5', color: 'white'}}>
                          <td colSpan={2} style={{textAlign: 'center'}}><strong>New Care</strong></td>
                        </tr>
                        <tr>
                          <td style={{width: '25%'}}><label htmlFor="care" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Care:&nbsp;</label></td>
                          <td>
                            <select name="care" id="care" style={{width: "90%"}} onChange={(e) => this.setState({care: e.target.value})}>
                              <option value="Feeding">Feeding</option>
                              <option value="Nap">Nap</option>
                              <option value="Diaper Change">Diaper Change</option>
                              <option value="Medicine">Medicine</option>
                              <option value="Note">Note / Other</option>
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
                    <div className="d-flex justify-content-center">
                <Button className="d-flex justify-content-center Login-Button mt-2" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'black', backgroundColor: 'white'}}>Create Care</Button>
            </div>
                    </Form>
                    </div>
                  </Col>
                  <Col xs="2" className="d-flex justify-content-center">
                    <div>
                      <Image src={lennyx} style={{width: 200}}/>
                    </div>
                  </Col>
                </Row>
                <hr/>
                <CareList test='testing'/>
            </div>
        )
    }
}

export default CareIndex;