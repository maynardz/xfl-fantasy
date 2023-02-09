import React from 'react';

import { Link } from 'react-router-dom';

import { Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

const Leagues = props => {
  // console.log(props);

  return (
    <div style={{textAlign: 'left', padding: '2em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h4 style={{ color: '#999999', fontFamily: 'Arial' }}>LEAGUES</h4>
        <AddCircle color='#999999' />
      </div>
      {
        props.leagues.length === 0 ? (
          <div>
            <p style={{ fontFamily: 'Arial', fontSize: '18px' }}>You're not currently in any leagues.</p>
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