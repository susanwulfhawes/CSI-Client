import * as React from 'react';

export interface FooterProps {
    
}
 
const Footer: React.SFC<FooterProps> = () => {
    return ( 
        <div className='d-flex justify-content-center' style={{color: '#ccc'}}>
           &#169; Care Share Infant 👶; Susan Wulf Hawes; 2021 
        </div>
     );
}
 
export default Footer;