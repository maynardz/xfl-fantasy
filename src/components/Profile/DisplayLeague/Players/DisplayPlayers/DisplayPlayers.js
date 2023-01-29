import React from 'react';
import { Card, CardBody, Header, Tabs, Tab, Box, TextInput } from 'grommet';

const colors = {
  qb: '#ff003c',
  rb: '#fcee09',
  wr: '#00f0ff',
  te: '#07C613',
  k: '#FC7909',
  def: '#5F12AA'
}

const DisplayPlayers = props => {

  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    value === '' ? props.setList([]) : console.log('players still in list')
  }, [value])

  const handle_keyup = () => {
    const filteredPlayers = props.players.filter(player => {
      if (value === "") return props.players;
      return player.first_name.toLowerCase().includes(value.toLowerCase()) || player.last_name.toLowerCase().includes(value.toLowerCase())
    });

    props.setList(filteredPlayers);
  } 

  return (
    <Card id='players_card' height='75vh' width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial', overflow: 'auto'}}>
      <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
        AVAILABLE PLAYERS
      </Header>
      <CardBody pad="large">
        <div>
          <div>
            <Tabs>
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
            </Tabs>
            <div>
              <TextInput
                placeholder="Search Player"
                value={value}
                onChange={event => (setValue(event.target.value), handle_keyup())}
                style={{width: '80%', margin: '0 auto', display: 'block'}}
              />
              <br/>
            </div>
          </div>
        { 
          props.list.length === 0 ? (
            <div>
              {
                props.players.map(player => (
                  <div key={player.id}>
                    <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }} >
                      <img src={player.player_image} style={{height: '50px', width: 'auto', display: 'inline', marginRight: '1em', marginBottom: '.2em' }} />
                      <p style={{ fontWeight: 700 }}>{player.first_name} {player.last_name}</p>
                    </div>
                    <div style={{ fontSize: '14px' }}>
                      {
                        player.pos === 'QB' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.qb, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        )
                        : player.pos === 'RB' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.rb, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        )
                        : player.pos === 'WR' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.wr, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        ) : player.pos === 'TE' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.te, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        ) : player.pos === 'K' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.k, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        ) : player.pos === 'DEF' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.def, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                          </div>
                        ) : null
                      }
                      {/* <p>{player.pos} - {player.team}</p> */}
                    </div>
                    <hr/>
                  </div>
                ))
              }
            </div>
          ) : (
            <div>
              {
                props.list.map(player => (
                  <div key={player.id}>
                    <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }} >
                      <img src={player.player_image} style={{height: '50px', width: 'auto', display: 'inline', marginRight: '1em', marginBottom: '.2em' }} />
                      <p style={{ fontWeight: 700 }}>{player.first_name} {player.last_name}</p>
                    </div>
                    <div style={{ fontSize: '14px' }}>
                      {
                        player.pos === 'QB' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.qb, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        )
                        : player.pos === 'RB' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.rb, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        )
                        : player.pos === 'WR' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.wr, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        ) : player.pos === 'TE' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.te, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        ) : player.pos === 'K' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.k, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                            <p>{player.team}</p>
                          </div>
                        ) : player.pos === 'DEF' ? (
                          <div style={{ display: 'flex' }}>
                            <p style={{ color: colors.def, marginRight: '.5em', fontWeight: 700 }}>{player.pos}</p>
                          </div>
                        ) : null
                      }
                      {/* <p>{player.pos} - {player.team}</p> */}
                    </div>
                    <hr/>
                  </div>
                ))
              }
            </div>
          )
        }
        </div>
      </CardBody>
    </Card>
  )
}

export default DisplayPlayers;