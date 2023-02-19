import React from 'react';
import APIURL from '../../../helpers/environment';

import DisplayStarters from './DisplayStarters/DisplayStarters';
import DisplayBench from './DisplayBench/DisplayBench';

import { Card, CardBody, Header } from 'grommet';
import { Actions } from 'grommet-icons';

const colors = {
  qb: '#ff003c',
  rb: '#fcee09',
  wr: '#00f0ff',
  te: '#07C613',
  k: '#FC7909',
  def: '#5F12AA'
}

const UserTeam = props => {

  const [team, setTeam] = React.useState([]);

  React.useEffect(() => {
    fetch_team();
  }, []);

  const fetch_team = async () => {
    await fetch(`${APIURL}/user/${props.userID}/league/${props.league.id}/team`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setTeam(json)
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div>
      <Card id='roster_card' height='100%' width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
        <CardBody pad="medium">
          <div>
            <h4 style={{color: 'white', fontFamily: 'Arial', display: 'inline-block'}}>{team.team_name}</h4>
            <Actions style={{height: '15px'}}/>
            <p style={{ margin: 0, marginTop: '-0.75em' }}>{team.wins}-{team.losses}</p>
          </div>
        </CardBody>
      </Card>

      <Card id='roster_card' height='100%' width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
        <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
          STARTERS
        </Header>
        <CardBody pad="medium">

          <DisplayStarters team={team} />

        </CardBody>
      </Card>

      <Card id='roster_card' height='100%' width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
        <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
          BENCH
        </Header>
        <CardBody pad="medium">

          {
            team.length === 0 ? <div></div> : <DisplayBench team={team} />
          }
          
        </CardBody>
      </Card>
    </div>
  )
}

export default UserTeam;