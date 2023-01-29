import React from 'react';

import { Card, CardBody, Header, Anchor } from 'grommet';

const DisplayAllLeagues = props => {

  return (
    <div style={{textAlign: 'center'}}>
      {
        props.leagues.length === 0 ? (
          <div>
            <p style={{ fontFamily: 'Arial', fontSize: '18px' }}>You're not currently in any leagues.</p>
          </div>
          ) : (
          props.leagues.map(league => (
            <div key={league.id} style={{margin: '1em'}}>
              <Anchor color={'#fafafa'} style={{ fontSize: '20px' }} onClick={() => {
                props.setSelectLeague(league)
                props.setDisplayLeague(!props.diplayLeague)
              }}>{league.league_name}</Anchor>
            </div>
          ))
        )
      }
    </div>
  )
}

export default DisplayAllLeagues;