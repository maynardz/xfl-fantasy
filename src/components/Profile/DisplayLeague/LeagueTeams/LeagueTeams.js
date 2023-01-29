import React from 'react';

import { Card, CardBody, Header, Paragraph, Button } from 'grommet';

const LeagueTeams = props => {

  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    fetch_managers();
  }, [])

  const fetch_managers = () => {
    fetch(`http://localhost:3000/league/${props.leagueId}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => setTeams(json))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
        <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
          <Paragraph>TEAMS</Paragraph>
          <Paragraph>1/10</Paragraph>
        </Header>
        <CardBody pad="large">
          <Button color={'#050A0E'} primary label="+ INVITE FRIENDS TO JOIN" style={{ fontSize: '14px' }} />
          {
            teams.map((team, index) => <p key={index}>1. {team.username}</p>)
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default LeagueTeams;