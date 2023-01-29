import React from 'react';
import './Profile.css';
import wolfpack_logo from '../../assets/images/wolfpack_logo_2.png';

import { Nav, Card, CardBody, Header } from 'grommet';

import DisplayAllLeagues from './DisplayAllLeagues/DisplayAllLeagues';
import Logout from './Logout/Logout';
import CreateLeague from './DisplayAllLeagues/CreateLeague/CreateLeague';
import DisplayLeague from './DisplayLeague/DisplayLeague';

const Profile = props => {

  const [leagues, setLeagues] = React.useState([])
  const [displayLeague, setDisplayLeague] = React.useState(false);
  const [selectLeague, setSelectLeague] = React.useState(undefined);

  React.useEffect(() => {
    fetch_user_leagues();
  }, [])

  const fetch_user_leagues = async () => {
    await fetch(`http://localhost:3000/user/${props.userID}/leagues`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setLeagues(json)
    })
  }

  if (!props.authenticated) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontFamily: 'Arial', color: '#fcee09', fontSize: '18px', fontWeight: '700', textAlign: 'center' }}>You are not authorized to view this page. Please create an account or login to an existing account to continue</p>
      </div>
    )
  } else {
    return (
      <div id='profile_container'>

        <Nav direction="row" background="#0B1115" pad="medium" style={{display: 'flex', justifyContent: 'center'}}>
          <img id='wolfpack_logo_nav' src={wolfpack_logo} alt='Wolfpack Fantasy Logo featuring a prominent W and P.' />
        </Nav>

        <br/>

        <div>
          {
            displayLeague ? <DisplayLeague sessionToken={props.sessionToken} selectLeague={selectLeague} displayLeague={displayLeague} setDisplayLeague={setDisplayLeague} /> : (
              <div>

                <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', fontFamily: 'Arial'}}>
                  <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
                    LEAGUES
                  </Header>
                  <CardBody pad="large">
                    <div>

                      <DisplayAllLeagues leagues={leagues} displayLeague={displayLeague} setDisplayLeague={setDisplayLeague} setSelectLeague={setSelectLeague} />

                      <br/>
                      <br/>

                      <CreateLeague leagues={leagues} sessionToken={props.sessionToken} userID={props.userID} currentUser={props.currentUser} fetch_user_leagues={fetch_user_leagues} />

                    </div>
                  </CardBody>
                </Card>

              </div>
            )
          }
        </div>

        <Logout clearLocalStorage={props.clearLocalStorage} />

      </div>
    )
  }
}


export default Profile;