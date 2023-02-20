import React from 'react';
import './Dashboard.css';
import wolfpack_logo from '../../assets/images/wolfpack_logo_2.png';

import { useNavigate } from 'react-router-dom';
import APIURL from '../../helpers/environment';

import { Nav, Button, Tabs, Tab } from 'grommet';
import { Scorecard, Group, Menu, AppsRounded, Article, BarChart } from 'grommet-icons';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';

import Leagues from './Leagues/Leagues';
import League from './League/League';
import Players from './Players/Players';
import Scores from './Scores/Scores';
import UserTeam from './UserTeam/UserTeam';
import Teams from './Teams/Teams';
import News from './News/News';
import Standings from './Standings/Standings';

const Dashboard = props => {
  const navigate = useNavigate();

  const [leagues, setLeagues] = React.useState([]);
  const [league, setLeague]  = React.useState({});
  const [userID, setUserID] = React.useState('');
  const [selectLeague, setSelectLeague] = React.useState({});
 
  const [display, setDisplay] = React.useState({
    league: true,
    team: false,
    players: true,
    scores: false,
    news: false,
    standings: false
  })

  React.useEffect(() => {
    if (localStorage.getItem('leagues')) {
      let obj = localStorage.getItem('leagues');
      let jsonObj = JSON.parse(obj);
      setLeagues(jsonObj);
    }

    if (localStorage.getItem('league')) {
      let obj = localStorage.getItem('league');
      let jsonObj = JSON.parse(obj);
      setLeague(jsonObj);
    }
    
    if (localStorage.getItem('userID')) {
      setUserID(localStorage.getItem('userID'));
    }
  }, []);

  React.useEffect(() => {
    fetch_all_leagues();
  }, [userID]);

  React.useEffect(() => {
    fetch_league()
  }, [selectLeague]);

  const updateLocalStorage_leagues = data => {
    localStorage.setItem('leagues', JSON.stringify(data));
  }

  const updateLocalStorage_league = data => {
    localStorage.setItem('league', JSON.stringify(data));
  }

  const fetch_all_leagues = async () => {
    if (userID === '') {
      return
    } else {
      await fetch(`${APIURL}/user/${userID}/leagues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.sessionToken}`
        }
      })
      .then(res => res.json())
      .then(json => {
        setLeagues(json);
        updateLocalStorage_leagues(json);
      })
    }
  }

  const fetch_league = async () => {
    if (selectLeague.id === undefined) {
      return 
    } else {
      await fetch(`${APIURL}/league/${selectLeague.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.sessionToken}`
        }
      })
      .then(res => res.json())
      .then(json => (
        setLeague(json)
      ))
      .catch(err => console.log(err))
    }
  }

  if (!props.authenticated) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontFamily: 'Arial', color: '#fcee09', fontSize: '18px', fontWeight: '700', textAlign: 'center' }}>You are not authorized to view this page. Please create an account or login to an existing account to continue</p>
      </div>
    )
  } else {
    return (
      <div>
        <Nav direction="row" background="#0B1115" pad="medium" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
          <Menu onClick={props.toggleDrawer('left', true)} />
          <Tabs>

            {/* <Tab className='tab' focusIndicator={false} title="MATCHUP">
              <Box pad="medium">
                
              </Box>
            </Tab> */}
        
            <Tab className='tab' focusIndicator={false} title="LEAGUE" onClick={() => setDisplay({ ...display, ['league']: true, ['team']: false })} >
              <Box pad="medium">
                
              </Box>
            </Tab>

            <Tab className='tab' focusIndicator={false} title="TEAM" onClick={() => setDisplay({ ...display, ['team']: true, ['league']: false })}>
              <Box pad="medium">
                {/* <UserTeam sessionToken={props.sessionToken} league={league} userID={userID} /> */}
              </Box>
            </Tab>

          </Tabs>
          {
            !props.sessionToken ? <div></div> :
            <AppsRounded id='sidebar_menu' onClick={props.toggleDrawer('right', true)}  />
          }
        </Nav>
        <div id='dashboard_container'>
          <Box
            role="presentation"
            onClick={props.toggleDrawer('left', false)}
            onKeyDown={props.toggleDrawer('left', false)}
          >
            <SwipeableDrawer
              anchor={'left'}
              open={props.state['left']}
              onClose={props.toggleDrawer('left', false)}
              onOpen={props.toggleDrawer('left', true)}
              PaperProps={{
                sx: { 
                  width: '95vw',
                  backgroundColor: '#292E33' 
                }
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <Leagues leagues={leagues} updateLocalStorage_league={updateLocalStorage_league} setSelectLeague={setSelectLeague} />
                {/* <CreateLeague leagues={leagues} sessionToken={props.sessionToken} userID={props.userID} currentUser={props.currentUser} /> */}
              </div>
              
              <div style={{marginBottom: '1em', textAlign: 'center'}}>
                <Button color='#fcee09' primary label="Logout" style={{ fontFamily: 'Arial', padding: '1em' }} onClick={() => {
                  props.clearLocalStorage();
                  navigate('/');
                }} />
              </div>
            </SwipeableDrawer>
          </Box>

          <div>
            {
              display.league ? (
                JSON.stringify(league) === '{}' ? (
                  <div style={{ color: 'white', fontFamily: 'Arial', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Button color='#fcee09' primary label='My Leagues' onClick={props.toggleDrawer('left', true)} />
                  </div>
                  ) : (
                    <div>
                      <League sessionToken={props.sessionToken} userID={userID} league={league} /> 
                      <Teams sessionToken={props.sessionToken} league={league} />
                    </div>
                ) 
              ) : display.team ? (
                <UserTeam sessionToken={props.sessionToken} userID={userID} league={league} />
              ) : <div></div>
            }
          </div>

          <SwipeableDrawer
            anchor={'right'}
            open={props.state['right']}
            onClose={props.toggleDrawer('right', false)}
            onOpen={props.toggleDrawer('right', true)}
            PaperProps={{
              sx: { 
                position: 'absolute',
                height: '100vh',
                backgroundColor: '#151B21' 
              }
            }}
          >
            <div id='sidebar_view'>
              <div style={{ height: '100%', width: '78vw', backgroundColor: '#292E33', overflowY: 'scroll' }}>
                {
                  display.players ? <Players sessionToken={props.sessionToken} userID={userID} league={league} /> : display.scores ? <Scores /> : display.news ? <News /> : display.standings ? <Standings /> : <div></div>
                }
              </div>
              <Nav>
                <div id='sidebar' style={{ textAlign: 'center' }}>

                  <div>
                    <div className='icon_container'>
                      <Button 
                        focusIndicator={false}
                        icon={
                          <Group 
                            className='sidebar_icon' 
                            color={display.players ? '#fcee09' : '#999999'}
                            onClick={() => setDisplay({ 
                                ...display, ['players']: true, ['scores']: false, ['news']: false, ['standings']: false 
                              }
                            )} 
                          />
                        } 
                      />
                    </div>
                    <span style={{ color: display.players ? '#fcee09' : '#999999' }}>Players</span>
                  </div>

                  <div>
                    <div className='icon_container'>
                      <Button 
                        focusIndicator={false}
                        icon={
                          <Scorecard 
                            className='sidebar_icon' 
                            color={display.scores ? '#fcee09' : '#999999'}
                            onClick={() => setDisplay({ 
                                ...display, ['scores']: true, ['players']: false, ['news']: false, ['standings']: false 
                              }
                            )} 
                          />
                        } 
                      />
                    </div>
                    <span style={{ color: display.scores ? '#fcee09' : '#999999' }}>Scores</span>
                  </div>

                  <div>
                    <div className='icon_container'>
                      <Button 
                        focusIndicator={false}
                        icon={
                          <BarChart 
                            className='sidebar_icon' 
                            color={display.standings ? '#fcee09' : '#999999'}
                            onClick={() => setDisplay({ 
                                ...display, ['standings']: true, ['players']: false, ['scores']: false, ['news']: false 
                              }
                            )} 
                          />
                        } 
                      />
                    </div>
                    <span style={{ color: display.standings ? '#fcee09' : '#999999' }}>Standings</span>
                  </div>

                  <div>
                    <div className='icon_container'>
                      <Button 
                        focusIndicator={false}
                        icon={
                          <Article 
                            className='sidebar_icon' 
                            color={display.news ? '#fcee09' : '#999999'}
                            onClick={() => setDisplay({ 
                                ...display, ['news']: true, ['players']: false, ['scores']: false, ['standings']: false 
                              }
                            )} 
                          />
                        } 
                      />
                    </div>
                    <span style={{ color: display.news ? '#fcee09' : '#999999' }}>News</span>
                  </div>

                </div>
              </Nav>
            </div>
          </SwipeableDrawer>
        </div>
      </div>
    )
  }
}


export default Dashboard;