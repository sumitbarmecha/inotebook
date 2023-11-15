import React from 'react';

 function Alert(props) {
    return (
       <div className='pt-5 m-3 fixed-top ' >

        
     {  props.alert &&     <div className={`alert alert-success alert-dismissible fade show `} role="alert">
           <strong>this is error message</strong>:type
</div> }
    </div>
        
    )
};
export default Alert 