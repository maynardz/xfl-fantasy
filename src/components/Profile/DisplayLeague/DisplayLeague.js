import React from 'react';
import './DisplayLeague.css';

import LeagueTeams from './LeagueTeams/LeagueTeams';
import Players from './Players/Players';

import { Grommet, Card, CardBody, Header, Button, Tabs, Tab, Box, Paragraph } from 'grommet';
import { deepMerge } from "grommet/utils";

const customTheme = deepMerge(Grommet, {
  global: {
    tab: {
      colors: {
        border: '#fcee09'
      },
    }
  }
});

const DisplayLeague = (props) => {
  const [leagueId, setLeagueId] = React.useState('');
  const [leagueName, setLeagueName] = React.useState('');

  React.useEffect(() => {
    fetch_league();
  }, [])

  const fetch_league = async () => {
    await fetch(`http://localhost:3000/league/${props.selectLeague.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => (
      // console.log(json),
      setLeagueId(json.id),
      setLeagueName(json.league_name)
    ))
    .catch(err => console.log(err))
  }

  return (
    <Grommet id={leagueId} theme={customTheme}>

      <Tabs id='league_tabs'>
        <Tab className='tab' focusIndicator={false} title="LEAGUE">
          <Box pad="medium">

            <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
              <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
                <Paragraph>LEAGUE</Paragraph>
                <Button color={'#151B21'} primary label="back to dashboard" onClick={() => props.setDisplayLeague(!props.displayLeague)} style={{ fontSize: '14px' }} />
              </Header>
              <CardBody pad="large">
                <h1>{leagueName}</h1>
                <p>Invite: {leagueId}</p>
              </CardBody>
            </Card>

            {
              !leagueId ? null : <LeagueTeams leagueId={leagueId} sessionToken={props.sessionToken} />
            }
            
          </Box>
        </Tab>
        <Tab className='tab' focusIndicator={false} title="TEAM">
          <Box pad="medium">TEAM</Box>
        </Tab>
        <Tab className='tab' focusIndicator={false} title="PLAYERS">
          <Box pad="medium">
            <Players sessionToken={props.sessionToken} />
          </Box>
        </Tab>
      </Tabs>

    </Grommet>
  )
}

export default DisplayLeague;