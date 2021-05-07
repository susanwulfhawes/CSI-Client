import * as React from 'react';
import {Col, Row, Image, Table, Form, Button} from 'react-bootstrap';


export interface CareUpdateModalProps {
    
}
 
export interface CareUpdateModalState {
    temp: string,
}
 
class CareUpdateModal extends React.Component<CareUpdateModalProps, CareUpdateModalState> {
    constructor(props: CareUpdateModalProps) {
        super(props);
        this.state = { temp: '' };
    }
    
    render() { 
        return (
            <div>
                Hello Update Care Modal
            </div>
         );
    }
}
 
export default CareUpdateModal;