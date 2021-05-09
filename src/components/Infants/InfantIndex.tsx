import * as React from 'react';
import jwt_decode from 'jwt-decode';
import { isThisTypeNode } from 'typescript';
import CreateInfant from '../Infants/CreateInfant';
import UpdateInfant from './UpdateInfant';
import APIURL from '../../helpers/environment';


export interface InfantIndexProps {
    token: string | any,
}
 
export interface InfantIndexState {
    hasInfant: string,
}
 
class InfantIndex extends React.Component<InfantIndexProps, InfantIndexState> {
    constructor(props: InfantIndexProps) {
        super(props);
        this.state = { 
            hasInfant: '' };
    }

    getUserInfant = () => {
        let token: string | any = localStorage.getItem('token');
        //console.log(jwt_decode(token));
        let jwtString: string | any = jwt_decode(token);
        console.log(jwtString.id)
        fetch((`${APIURL}/user/userbyid/` + jwtString.id), {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            'Authorization': token
          }),
      })
          .then((res) => (res.json()))
          .then((data) => {
              this.setState({hasInfant: data.infantId})
          })
          
    };

    componentDidMount() {
        this.getUserInfant();
    }

    render() { 
        console.log('has infant', this.state.hasInfant)
        return ( 
        <div>
            {this.state.hasInfant == null ? <CreateInfant token={localStorage.getItem('token')}/> : <UpdateInfant />}
        </div> 
        );
    }
}
 
export default InfantIndex; 