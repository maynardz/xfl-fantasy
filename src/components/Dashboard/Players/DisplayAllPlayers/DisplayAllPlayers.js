import React from 'react';
import { Button } from 'grommet';
import { AddCircle } from 'grommet-icons';

const colors = {
  qb: '#ff003c',
  rb: '#fcee09',
  wr: '#00f0ff',
  te: '#07C613',
  k: '#FC7909',
  def: '#5F12AA'
}

const DisplayPlayers = props => {
  // console.log(props);

  // const handle_keyup = () => {
  //   const filteredPlayers = props.players.filter(player => {
  //     if (value === "") return props.players;
  //     return player.first_name.toLowerCase().includes(value.toLowerCase()) || player.last_name.toLowerCase().includes(value.toLowerCase())
  //   });

  //   props.setList(filteredPlayers);
  // } 

  // const getTeams = async () => {
  //   const teamsReq = await fetch('http://sports.core.api.espn.com/v2/sports/football/leagues/xfl/teams');
  //   const teamsRes = await teamsReq.json();

  //   const teamReq = 
  // }

  return (
    
    <div onClick={() => props.handle_toggle(props.player)}>
            {/* <hr style={{ width: '80%', float: 'left', margin: 0 }} /> */}
      <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', height: '60px', fontFamily: 'Arial', color: 'white', borderBottom: '1px solid white' }}>
        <div>
          <Button icon={ <AddCircle /> } onClick={() => props.addPlayer(props.player)} />
        </div>
        <div>
          <h4>
            {
              props.index+1 < 10 ? 
              <p style={{ marginRight: '2.5em', fontSize: '14px' }}>
                <span style={{ visibility: 'hidden' }}>0</span>
                <span style={{ visibility: 'hidden' }}>0</span>
                  {props.index+1}
              </p> 
              : props.index+1 >= 10 && props.index+1 < 100 ? 
              <p style={{ marginRight: '2.5em', fontSize: '14px' }}>
                <span style={{ visibility: 'hidden' }}>0</span>
                  {props.index+1}
              </p> 
              : <p style={{ marginRight: '2.5em', fontSize: '14px' }}>{props.index+1}</p>
            }
          </h4>
        </div>
        <div>
          <div style={{}}>
            <p style={{ marginBottom: '-2.5px', fontSize: '14px' }}><b>{props.player.fullName}</b></p>
            <p style={{ fontSize: '12px', marginTop: '-2.5px'}}><span style={{ color: props.player.position.abbreviation === 'QB' ? colors.qb : props.player.position.abbreviation === 'RB' ? colors.rb : props.player.position.abbreviation === 'WR' ? colors.wr : props.player.position.abbreviation === 'TE' ? colors.te : props.player.position.abbreviation === 'k' ? colors.k : '#fff' }}>{props.player.position.abbreviation}</span> - {props.player.team.abbreviation}</p>
          </div>
        </div>
      </div>
      {/* <hr style={{ width: '80%', float: 'left', margin: 0 }} /> */}
      {/* <div> */}
        {/* <Tabs>
          <Tab className='tab' focusIndicator={false} title="ALL" onClick={() => props.fetch_players()}>
            <Box pad="medium">

            </Box>
          </Tab>
          <Tab className='tab' focusIndicator={false} title="QB" onClick={() => props.fetch_players_byPos('QB')}>
            <Box pad="medium">

            </Box>
          </Tab>
          <Tab className='tab' focusIndicator={false} title="RB" onClick={() => props.fetch_players_byPos('RB')}>
            <Box pad="medium">

            </Box>
          </Tab>
          <Tab className='tab' focusIndicator={false} title="WR" onClick={() => props.fetch_players_byPos('WR')}>
            <Box pad="medium">

            </Box>
          </Tab>
          <Tab className='tab' focusIndicator={false} title="TE" onClick={() => props.fetch_players_byPos('TE')}>
            <Box pad="medium">

            </Box>
          </Tab>
          <Tab className='tab' focusIndicator={false} title="K" onClick={() => props.fetch_players_byPos('K')}>
            <Box pad="medium">

            </Box>
          </Tab>
          <Tab className='tab' focusIndicator={false} title="DEF" onClick={() => props.fetch_players_byPos('DEF')}>
            <Box pad="medium">

            </Box>
          </Tab>
        </Tabs> */}

        {/* <div>
          <TextInput
            placeholder="Search Player"
            value={value}
            onChange={event => (setValue(event.target.value), handle_keyup())}
            style={{width: '80%', margin: '0 auto', display: 'block'}}
          />
          <br/>
        </div> */}

      {/* </div> */}

    </div>
  )
}

export default DisplayPlayers;