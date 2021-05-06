import * as React from 'react';
import {Form, Table, Button} from 'react-bootstrap';
import logo from '../../assets/logo.png';


export interface UpdateInfantProps {
    
}
 
export interface UpdateInfantState {
    updateBabyName: string,
    updateParentName: string,
    updateContactNumber: string,
}
 
class UpdateInfant extends React.Component<UpdateInfantProps, UpdateInfantState> {
    constructor(props: UpdateInfantProps) {
        super(props);
        this.state = {
            updateBabyName: '',
            updateParentName: '',
            updateContactNumber: '',
         };
    }

    handleSubmit = () => {
        console.log('handle submit')
    }

    render() { 
        return ( 
            <div style={{backgroundColor: '#C1DDD8', minHeight: 1000}}>
                <div className='pt-3'>
                    <img className="d-flex justify-content-begin ml-5" src={logo} alt='Logo' style={{backgroundColor: '#ffffff00', width: 120, border: '3px solid #F2C2C2', borderRadius: 10}} />
                </div>
            <div className='ml-5' style={{backgroundColor: '#C1DDD8', minHeight: 1000}}>
                <div className='d-flex justify-content-center' >
                    <Form style={{maxWidth: '500px'}} onSubmit={this.handleSubmit}>
                    <Table style={{backgroundColor: 'white'}}>
                        <thead>
                            <tr style={{backgroundColor: '#6EC4C5', color: 'white'}}>
                            <td colSpan={2} style={{textAlign: 'center'}}><strong>Update Baby Info</strong></td>
                            </tr>
                        </thead>
                      <tbody>
                        
                        <tr>
                        <td>
                            <label htmlFor="updateBabyName" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Baby's Name:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='updateBabyName' name='type'  value={this.state.updateBabyName} style={{width: "90%"}} onChange={(e) => this.setState({updateBabyName: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="updateParentName" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Parent's Name:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='updateParentName' name='type'  value={this.state.updateParentName} style={{width: "90%"}} onChange={(e) => this.setState({updateParentName: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="updateContactNumber" className="d-flex justify-content-end">Contact Number:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='updateContactNumber' name='updateContactNumber' value={this.state.updateContactNumber} style={{width: "90%"}} onChange={(e) => this.setState({updateContactNumber: e.target.value})}></input>
                          </td>
                        </tr>
                        
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                <Button className="d-flex justify-content-center Login-Button mt-2 mr-3" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'black', backgroundColor: 'white'}}>Update</Button>
                <Button className="d-flex justify-content-center Login-Button mt-2 ml-3" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'red', backgroundColor: 'white'}}>Delete</Button>
            </div>
                    </Form>
                    </div>
                    
                </div>
                </div>
         );
    }
}
 
export default UpdateInfant;