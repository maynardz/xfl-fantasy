import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

const Leagues = props => {
  // console.log(props);
  const navigate = useNavigate();

  return (
    <div style={{textAlign: 'left', padding: '2em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h4 style={{ color: '#999999', fontFamily: 'Arial' }}>LEAGUES</h4>
        <AddCircle color='#999999' onClick={() => navigate('/dashboard/league/new')} />
      </div>
      {
        props.leagues.length === 0 ? (
          <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Arial', fontSize: '18px', color: '#999999' }}>You're not currently in any leagues.</p>
            <p style={{ fontFamily: 'Arial', fontSize: '12.5px', color: '#999999' }} >Click the {<AddCircle style={{height: '12.5px'}} />} Icon above to create a league</p>
          </div>
          ) : (
          props.leagues.map(league => (
            <div key={league.id} style={{margin: '1.2em', backgroundColor: '#fcee09', padding: '5px 0 5px 1em', borderRadius: '5px'}} onClick={() => {
              props.updateLocalStorage_league(league);
              props.setSelectLeague(league);
            }}>
              <p style={{ textDecoration: 'none' }} >
                <Text style={{ color: 'black', fontSize: '1.2rem', fontFamily: 'Arial' }}>{league.league_name}</Text>
              </p>
            </div>
          ))
        )
      }
    </div>
  )
}

export default Leagues;