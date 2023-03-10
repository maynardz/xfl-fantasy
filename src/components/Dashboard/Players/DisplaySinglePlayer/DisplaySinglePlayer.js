import React from 'react';
import './DisplaySinglePlayer.css';

import { Card, CardBody, Header, Button } from 'grommet';

const colors = {
  qb: '#ff003c',
  rb: '#fcee09',
  wr: '#00f0ff',
  te: '#07C613',
  k: '#FC7909',
  def: '#5F12AA'
}

const DisplaySinglePlayer = props => {
  // console.log(props);

  return (
    <div>
      <Card id='players_card' height='100vh' width="92vw" background="#151B21" style={{ fontFamily: 'Arial', overflow: 'auto'}}>
        <Header id='sp_header' style={{ padding: '1.5em', fontWeight: '700', background: `linear-gradient(to right, #${props.selectedPlayer.team.color}, #000000)`, height: '250px', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '1.60em', fontSize: '1.15rem' }}>{props.selectedPlayer.fullName}</h2>
          {/* <h6>{props.selectedPlayer.team.name}</h6> */}
          <div style={{ display: 'flex' }}>
            <div className='personal_info'>
              <p>AGE</p>
              <p>
                {
                  !props.selectedPlayer.age ? '-' : props.selectedPlayer.age
                }
              </p>
            </div>
            <div className='personal_info'>
              <p>HEIGHT</p>
              <p>
                {
                  !props.selectedPlayer.displayHeight ? '-' : props.selectedPlayer.displayHeight
                }
              </p>
            </div>
            <div className='personal_info'>
              <p>WEIGHT</p>
              <p>
                {
                  !props.selectedPlayer.displayWeight ? '-' : props.selectedPlayer.displayWeight
                }
              </p>
            </div>
            <div className='personal_info'>
              <p>EXP</p>
              <p>{props.selectedPlayer.experience['years']}</p>
            </div>
          </div>
        </Header>
        <div style={{height: '75px', width: '200px', backgroundColor: '#151B21', position: 'relative', marginTop: '-3.5em', borderRadius: '0% 25% 0% 0', textAlign: 'center', }}>
          <h5 style={{margin: '15px'}}>{props.selectedPlayer.team.name.toUpperCase()} #{props.selectedPlayer.jersey ? props.selectedPlayer.jersey : '?' }</h5>
          <p style={{marginTop: '-22px', fontSize: '14px'}}><span style={{ color: props.selectedPlayer.position.abbreviation === 'QB' ? colors.qb : props.selectedPlayer.position.abbreviation === 'RB' ? colors.rb : props.selectedPlayer.position.abbreviation === 'WR' ? colors.wr : props.selectedPlayer.position.abbreviation === 'TE' ? colors.te : props.selectedPlayer.position.abbreviation === 'k' ? colors.k : '#fff' }}>{props.selectedPlayer.position.abbreviation}</span> ?? {props.selectedPlayer.team.abbreviation}</p>  
        </div>
        <CardBody pad="large">
          <div>
            {props.selectedPlayer.id}
            <br/>
            <br/>
            <Button label='<' style={{ position: 'absolute', top: 25, marginBottom: '1em' }} color='#fcee09' onClick={() => {
              props.setSelectedPlayer({});
              props.setToggle(!props.toggle);
            }} />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DisplaySinglePlayer;