import React from 'react';
import './DisplayLeague.css';

import LeagueTeams from './LeagueTeams/LeagueTeams';
import UserTeam from './UserTeam/UserTeam';
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
  // console.log(props);
  
  const [league, setLeague] = React.useState({});

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
      setLeague(json)
    ))
    .catch(err => console.log(err))
  }

  return (
    <Grommet id={league.id} theme={customTheme}>

      <Tabs id='league_tabs'>
        <Tab className='tab' focusIndicator={false} title="LEAGUE">
          <Box pad="medium">

            <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>

              <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
                <Paragraph>LEAGUE</Paragraph>
                <Button color={'#151B21'} primary label="back to dashboard" onClick={() => props.setDisplayLeague(!props.displayLeague)} style={{ fontSize: '14px' }} />
              </Header>

              <CardBody pad="large">
                <h1>{league.league_name}</h1>
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '14px', marginTop: '-10px' }}>
                    <b style={{ color: '#fcee09' }}>League Type:</b> {league.league_type}
                  </p>
                  <p style={{ fontSize: '14px', marginTop: '-10px', marginLeft: '1em' }}>
                    <b style={{ color: '#fcee09' }}>Draft Type:</b> {league.draft_type}
                  </p>
                </div>
                <p>League ID: {league.id}</p>
              </CardBody>
              
            </Card>

            {
              !league ? null : <LeagueTeams league={league} sessionToken={props.sessionToken} />
            }
            
          </Box>
        </Tab>
        <Tab className='tab' focusIndicator={false} title="TEAM">
          <Box pad="medium">
            <UserTeam sessionToken={props.sessionToken} league={league} userID={props.userID} />
          </Box>
        </Tab>
        <Tab className='tab' focusIndicator={false} title="PLAYERS">
          <Box pad="medium">
            <Players sessionToken={props.sessionToken} league={league} userID={props.userID} />
          </Box>
        </Tab>
      </Tabs>

    </Grommet>
  )
}

export default DisplayLeague;