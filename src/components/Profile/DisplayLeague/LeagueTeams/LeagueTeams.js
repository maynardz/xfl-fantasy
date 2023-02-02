import React from 'react';

import Invite from './Invite/Invite';

import { Card, CardBody, Header, Paragraph } from 'grommet';

const LeagueTeams = props => {

  const [teams, setTeams] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log('effect ran')
    fetch_managers();
  }, [])

  const fetch_managers = async () => {
    await fetch(`http://localhost:3000/league/${props.league.id}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(json => setTeams(json))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
        <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
          <Paragraph>TEAMS</Paragraph>
          <Paragraph>{teams.length}/{props.league.league_size}</Paragraph>
        </Header>
        <CardBody pad="large">
          <Invite open={open} setOpen={setOpen} league={props.league} />
          {
            teams.map((team, index) => <p key={index}>1. {team.username}</p>)
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default LeagueTeams;