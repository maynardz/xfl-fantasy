import React from 'react';
import './League.css';

import { Card, CardBody, Header, Paragraph, Tabs, Tab, Box } from 'grommet';
import { Scorecard, Group } from 'grommet-icons';

import Drawer from '@mui/material/Drawer';

import UserTeam from '../UserTeam/UserTeam';

const DisplayLeague = (props) => {
  // console.log(props);

  return (
    <div>
      {/* <Grommet id={league.id} theme={customTheme}> */}
      <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>

        <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
          <Paragraph>LEAGUE</Paragraph>
          {/* <Button color={'#151B21'} primary label="back to dashboard" onClick={() => props.setDisplayLeague(!props.displayLeague)} style={{ fontSize: '14px' }} /> */}
        </Header>

        <CardBody pad="large">
            <h1>{props.league.league_name}</h1>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '14px', marginTop: '-10px' }}>
                <b style={{ color: '#fcee09' }}>League Type:</b> {props.league.league_type}
              </p>
              <p style={{ fontSize: '14px', marginTop: '-10px', marginLeft: '1em' }}>
                <b style={{ color: '#fcee09' }}>Draft Type:</b> {props.league.draft_type}
              </p>
            </div>
            <p>League ID: {props.league.id}</p>
        </CardBody>

      </Card>      
      {/* </Grommet> */}
    </div>
  )
}

export default DisplayLeague;