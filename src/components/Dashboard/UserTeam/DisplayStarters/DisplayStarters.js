import React from 'react';

const DisplayStarters = props => {
  console.log(props);
  return (
    <div>
      <div style={{display: 'flex', padding: '0.5em'}}>
        <button style={{height: '50px', width: '60px', marginRight: '1em'}}>QB</button>
        <p>Empty</p>
      </div>
      <div style={{display: 'flex', padding: '0.5em'}}>
        <button style={{height: '50px', width: '60px', marginRight: '1em'}}>RB</button>
        <p>Empty</p>
      </div>
      <div style={{display: 'flex', padding: '0.5em'}}>
        <button style={{height: '50px', width: '60px', marginRight: '1em'}}>WR</button>
        <p>Empty</p>
      </div>
      <div style={{display: 'flex', padding: '0.5em'}}>
        <button style={{height: '50px', width: '60px', marginRight: '1em'}}>WR</button>
        <p>Empty</p>
      </div>
      <div style={{display: 'flex', padding: '0.5em'}}>
        <button style={{height: '50px', width: '60px', marginRight: '1em'}}>TE</button>
        <p>Empty</p>
      </div>
    </div>
  )
}

export default DisplayStarters;