import * as React from 'react';
import APIURL from '../../helpers/environment';


export interface CareGiverTableProps {
    
}
 
export interface CareGiverTableState {
    userArry: string[] | any,
}
 
class CareGiverTable extends React.Component<CareGiverTableProps, CareGiverTableState> {
    constructor(props: CareGiverTableProps) {
        super(props);
        this.state = { 
            userArry: [],
         };
    }

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
            console.log('in the fetch', (users[0].email))
            this.setState({userArry: users})
    }
    )};

    componentDidMount() {
        this.fetchUsers()
    };

    careGiverMapper = () => {
        // console.log('in the mapper', this.state.userArry.users.email)

        

        return this.state.userArry.map((users: string, i: number) => {
            // let i = 0;
            console.log(this.state.userArry.length, 'length')
            // for (i = 0; i < this.state.userArry.length; i++){

                return (
                    <tr key={i}>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{this.state.userArry[i].email}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{this.state.userArry[i].firstname}&nbsp;{this.state.userArry[i].lastname}</td>
                        <td style={{paddingTop: '5px', borderRight: '1px solid #ddd'}}>&nbsp;{this.state.userArry[i].role === "1"? 'Administrator' : ''}{this.state.userArry[i].role === "2"? 'Care Giver' : ''}{this.state.userArry[i].role === "3"? 'Viewer' : ''}</td>
                    </tr>
                )
        })
    }

    render() { 
        return ( 
            <div className='d-flex justify-content-center mt-4'>
            <table className='mb-3' width='60%' style={{border: '1px solid #ddd'}}>
                <thead>
                    <tr style={{backgroundColor: '#6EC4C5', color: 'white'}}>
                        <th className='py-3'>&nbsp;Email</th>
                        <th style={{width: '35%'}}>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className='Care-List' style={{backgroundColor: 'white'}}>
                    {this.careGiverMapper()}
                </tbody>
                
            </table>
            {/* {this.showUpdateInput()} */}
            </div>
         );
    }
}
 
export default CareGiverTable;