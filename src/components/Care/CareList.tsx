import * as React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { updateShorthandPropertyAssignment } from 'typescript';
import {ICares} from './CareInterface';
import {Button} from 'react-bootstrap';

export interface CareListProps {
    test: string,
}
 
export interface CareListState {
    caresall: ICares[],
    userArry: string[] | any,
    username: string,
    i: number,
    token: string | any,
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
         };
    }

    fetchCares = () => {
        fetch('http://localhost:3000/care/allcares', {
            method: "GET",
            headers: new Headers ({
                'Content-Type': 'application-json',
                // 'Authorization': props.token
            })
        })
        .then((response) => response.json())
        .then((cares: ICares[]) => {
            console.log(cares);
            this.setState({caresall: cares})
    }
    )};

    fetchUsers = () => {
        fetch('http://localhost:3000/user/allusers', {
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
        
        this.fetchUsers()
        this.fetchCares()
    };

    // userNameFunc = (item: any, index: any) => {
    //     //console.log(item)
    //     //console.log(index)
    // }

    userNameFunc = (userid: number) => {
        console.log('array', this.state.userArry.length, userid);
        let i = 0;
        for (i = 0; i < this.state.userArry.length; i++){
            if (this.state.userArry[i].id === userid) {
                return (
                    this.state.userArry[i].firstname + ' ' + this.state.userArry[i].lastname
                )
        }
    }
    };

    // userRoleAndId = () => {
    //     fetch('http://localhost:3000/user/current', {
    //         method: "GET",
    //         headers: new Headers({
    //           "Content-Type": "application/json",
    //           'Authorization': this.state.token
    //         })
    //     })
    //     .then((res) => res.json())
    //     .then((data) => return (
    //        ( data )
    //     )
            
    //     )}

    

    careMapper = () => {
        console.log(this.state.userArry);
        console.log(this.state.caresall);
        // console.log('role and id', this.userRoleAndId())
        return this.state.caresall.reverse().map((care, index) => {
            this.userNameFunc(care.userId)
           

            return (
                
                <tr key={index}>
                    <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.care}</td>
                    <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.type}</td>
                    <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.amount}</td>
                    <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.time}</td>
                    <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{care.date}</td>
                    <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{this.userNameFunc(care.userId)}</td>
                    <td>
                        <Button onClick={() => {console.log('update')}} className="d-flex justify-content-center Login-Button" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 14, color: 'black', backgroundColor: 'white'}}>Update</Button>
                    </td>
                    <td>
                        <Button onClick={() => {console.log('delete')}} className="d-flex justify-content-center Login-Button" type="submit" style={{border: '2px solid #6EC4C5', borderRadius: 5, fontSize: 14, color: 'red', backgroundColor: 'white'}}>Delete</Button>
                    </td>
                </tr>
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