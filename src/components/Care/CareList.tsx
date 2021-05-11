import * as React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
//import { updateShorthandPropertyAssignment } from 'typescript';
import {ICares} from './CareInterface';
import {Button} from 'react-bootstrap';
import {Form, Table} from 'react-bootstrap';
import { convertToObject, updateTypeReferenceNode } from 'typescript';
import APIURL from '../../helpers/environment';


export interface CareListProps {
    test: string,
}
 
export interface CareListState {
    caresall: ICares[],
    userArry: string[] | any,
    username: string,
    i: number,
    token: string | any,
    showUpdate: boolean,
    care: string,
    updateCare: string,
    type: string,
    updateType: string,
    amount: string,
    updateAmount: string,
    time: string,
    date: string,
    carebyid: object | any,
    updateCareid: string,
    userRole: string,
    userInfantId: number,
}

// export interface ICares {
//     amount: string,
//     type: string,
//     care: string,
// }
 
class CareList extends React.Component<CareListProps, CareListState> {
    constructor(props: CareListProps) {
        super(props);
        this.state = { 
            caresall: [],
            userArry: [],
            username: '',
            i: 0,
            token: localStorage.getItem('token'),
            showUpdate: false,
            care: 'Feeding',
            updateCare: 'Feeding',
            type: '',
            updateType:'',
            amount: '',
            updateAmount: '',
            time: '',
            date: '',
            carebyid: '',
            updateCareid: '',
            userRole: '',
            userInfantId: 0,
         };
    }

    fetchCares = () => {
        fetch(`${APIURL}/care/allcares`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application-json',
                // 'Authorization': props.token
            })
        })
        .then((response) => response.json())
        .then((cares: ICares[]) => {
            //console.log(cares);
            this.setState({caresall: cares})
    }
    )};

    fetchUsers = () => {
        fetch(`${APIURL}/user/allusers`, {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application-json',
                // 'Authorization': props.token
            })
        })
        .then((res) => res.json())
        .then((users) => {
            this.setState({userArry: users})
    }
    )};

    componentDidMount() {
        this.userRoleAndId()
        this.fetchUsers()
        this.fetchCares()
        
    };

    handleSubmit = () => {
        fetch((`${APIURL}/care/update/` + this.state.updateCareid),{
            method: 'POST',
            headers: new Headers ({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                care: this.state.updateCare,
                type: this.state.updateType,
                amount: this.state.updateAmount,
              }),
            })
            .then((res) => res.json())
        }
            

    // componentDidUpdate() {
    //     this.fetchCares()
    // }

    // userNameFunc = (item: any, index: any) => {
    //     //console.log(item)
    //     //console.log(index)
    // }

    userNameFunc = (userid: number) => {
        //console.log('array', this.state.userArry.length, userid);
        let i = 0;
        for (i = 0; i < this.state.userArry.length; i++){
            if (this.state.userArry[i].id === userid) {
                return (
                    this.state.userArry[i].firstname + ' ' + this.state.userArry[i].lastname
                )
        }
    }
    };

    userRoleAndId = () => {
        fetch(`${APIURL}/user/current`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              'Authorization': this.state.token
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            this.setState({userRole: data.role})
            this.setState({userInfantId: data.infantId})
        }
            
        )}
        
        // listUserInfantId = (id: number | any) => {
        //     console.log('the url', (`${APIURL}/user/userbyid/` + id))
        //     fetch((`${APIURL}/user/userbyid/` + id), {
        //         method: "GET",
        //         headers: new Headers({
        //           "Content-Type": "application/json",
        //           'Authorization': this.state.token
        //         })
        //     })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log('from list user infantid', data)
        //         return (data.infantId)
        //     }
                
        //     )}

    deleteCare = (careid: number) => {
        console.log(careid)
        fetch((`${APIURL}/care/delete/` + careid), {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then((() => console.log('deleted')))
        this.fetchCares()
        this.careMapper()
    };

   

    toggleCareUpdateOn = (careid: number) => {
        this.setState({showUpdate: true})
        fetch((`${APIURL}/care/carebyid/` + careid), {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        this.setState({updateType: data.type})
        this.setState({updateAmount: data.amount})
        this.setState({updateCare: data.care})
        this.setState({updateCareid: data.id})
        return (data);
    })
    
    
}

fillUpdateFields = (carebyidobj: object) => {
    console.log(' care by id ', carebyidobj)
    // let input = document.getElementById(this.state.updateType);
    // input.value = carebyid.type;
}
    

    toggleCareUpdateOff = () => {
        this.setState({showUpdate: false})
    }

    showUpdateInput = () => {
        console.log('show true or false', this.state.showUpdate)
        // this.setState({updateType: 'help'})
        //console.log('this is show update', this.state.showUpdate)
        if (!this.state.showUpdate){
            return <></>
        } else {
            return (
                <div className='ml-5' style={{backgroundColor: '#C1DDD8', minHeight: 1000}}>
                    <Form onSubmit={this.handleSubmit}>
                    <Table style={{backgroundColor: 'white'}}>
                        <thead>
                            <tr style={{backgroundColor: '#6EC4C5', color: 'white'}}>
                            <td colSpan={2} style={{textAlign: 'center'}}><strong>Update Care</strong></td>
                            </tr>
                        </thead>
                      <tbody>
                        
                        <tr>
                          <td style={{width: '25%'}}><label htmlFor="updateCare" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Care:&nbsp;</label></td>
                          <td>
                            <select name="updateCare" id="updateCare"           value={this.state.updateCare} style={{width: "90%"}} onChange={(e) => this.setState({updateCare: e.target.value})}>
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
                            <label htmlFor="updateType" className="d-flex justify-content-end"><span style={{color: 'red'}}>&#42; &nbsp;</span>Description:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='updateType' name='type'  value={this.state.updateType} style={{width: "90%"}} onChange={(e) => this.setState({updateType: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="updateAmount" className="d-flex justify-content-end">Amount:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='updateAmount' name='updateAmount' value={this.state.updateAmount} style={{width: "90%"}} onChange={(e) => this.setState({amount: e.target.value})}></input>
                          </td>
                        </tr>
                        {/* <tr>
                          <td>
                            <label htmlFor="time" className="d-flex justify-content-end">Time:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='time' name='time' style={{width: "90%"}} onChange={(e) => this.setState({time: e.target.value})}></input>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="date" className="d-flex justify-content-end">Date:&nbsp;</label>
                          </td>
                          <td>
                            <input type='text' id='date' name='date' style={{width: "90%"}} onChange={(e) => this.setState({date: e.target.value})}></input>
                          </td>
                        </tr> */}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                <Button className="d-flex justify-content-center Login-Button mt-2" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 20, color: 'black', backgroundColor: 'white'}}>Update Care</Button>
            </div>
                    </Form>
                    
                </div>
            )
        }
        
    };


    careMapper = () => {
               
        // console.log('role and id', this.state.userRole)
        // console.log('tertiary', (this.listUserInfantId(1)))
        return this.state.caresall.reverse().map((care, index) => {
            this.userNameFunc(care.userId)
           

            return (
                <>
                {/* this is where the tertiary check that the user.id(care.userid).infantId === currentuser.infantId */}
                {/* {CURRENTUSER.infantId !== USER.(care.userid).infantId ? */}
                {/* {this.state.userInfantId !== this.listUserInfantId(11) ?
                <></> : */}
                
                    <tr key={index}>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.care}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.type}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.amount}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.time}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.date}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{this.userNameFunc(care.userId)}</td>
                        <td>
                            {/* {this.UpdateButton} */}
                            {this.state.userRole === "3" ? <></> :
                            <Button onClick={() => {
                                this.setState({carebyid: this.toggleCareUpdateOn(care.id)})
                                this.toggleCareUpdateOn(care.id);
                                this.careMapper();
                                }} 
                                className="d-flex justify-content-center Login-Button" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 14, color: 'black', backgroundColor: 'white'}}>Update</Button>
                            }
                        </td>
                        <td>
                        {this.state.userRole === "3" ? <></> :
                        <Button onClick={() => this.deleteCare(care.id)} className="d-flex justify-content-center Login-Button" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 14, color: 'red', backgroundColor: 'white'}}>Delete</Button>
                        }
                        </td>
                    </tr>
                    {/* } */}
                </>
                );
        })
        
    }

    render() { 
        return ( 
            <div className='d-flex justify-content-center mt-4'>
            <table className='mb-3' width='80%' style={{border: '1px solid #ddd'}}>
                <thead>
                    <tr style={{backgroundColor: '#6EC4C5', color: 'white'}}>
                        <th className='py-3'>&nbsp;Care</th>
                        <th style={{width: '35%'}}>Description</th>
                        <th>Amount</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Care Giver Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className='Care-List' style={{backgroundColor: 'white'}}>
                    {this.careMapper()}
                </tbody>
                
            </table>
            {this.showUpdateInput()}
            </div>
         );
    }
}
 
export default CareList;


// import * as React from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
// //import { propTypes } from 'react-bootstrap/esm/Image';

// export interface CareListProps {
//     //cares: object,
//     test: string,
// }
 
// const CareList: React.SFC<CareListProps> = () => {

//     return ( 
//         <div>
//             Let em Roll 🎲🤞
//             <p>{this.props.test}</p>
//         </div>
//      );
// }
 
// export default CareList;




// import React, {Component} from 'react';
// import {Button, Form} from 'react-bootstrap';
// import ReactDOM from 'react-dom';
// import { isThisTypeNode } from 'typescript';


// // type AcceptedProps = {
// //     updateSessionToken: (newToken: string) => void;
// // };

// // type MyState = {
// //     email: string,
// //     password: string,
// //     firstname: string,
// //     lastname: string,
// //     registerToggle: boolean,
// // };

// class CareList extends Component {

//     fetchCares = () => {
//         fetch('http://localhost:3000/care/allcares', {
//             method: "GET",
//             headers: new Headers ({
//                 'Content-Type': 'application-json',
//                 // 'Authorization': props.token
//             })
//         })
//         .then((response) => response.json())
//         .then((cares) => {
//             console.log(cares)
//     }
//         )};
    
//     cares = () => {
//         return (
//             {caresall: this.fetchCares()}
//         )
//     }

//     careMapper = () => {
//         console.log('hi you', this.cares)
        
//     }

//     render(){
//         return(
//             <div>
//                 care list
//                 {this.careMapper()}
//             </div>
//         ) 
//     }
// }

// export default CareList;