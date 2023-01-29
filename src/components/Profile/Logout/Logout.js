import React from 'react';

const Logout = props => {
  return (
    <div>
      <p onClick={props.clearLocalStorage} style={{color: '#fafafa', textAlign: 'center', fontFamily: 'Arial', fontSize: '12px'}}>Logout</p>
    </div>
  )
}

export default Logout;