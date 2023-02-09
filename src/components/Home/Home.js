import React from 'react';
import './Home.css';

import { Link } from 'react-router-dom';

// import wolfpack_logo from '../../assets/images/wolfpack_logo_2.png';
import wolfpack_pictoral from '../../assets/images/wolfpack_pictoral.png';

import { Card, CardBody, Heading, Paragraph, Button, WorldMap, Tip } from 'grommet';

import ssd from '../../assets/images/ssd.png';
// import {
//   useNavigate
// } from "react-router-dom";

const Dashboard = props => {
  // const navigate = useNavigate();

  // const route_newpage = () => {
  //   navigate('/auth');
  // }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', marginBottom: '1em', fontFamily: 'Arial'}}>
          {/* <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
            LEAGUES
          </Header> */}
          {/* <Main pad="large" background={'white'}> */}
            {/* <img id='wolfpack_logo_dash' src={wolfpack_pictoral} alt='Wolfpack Fantasy Logo featuring a prominent W and P.' /> */}
            <div style={{display: 'block', margin: '0 auto'}}>
              <WorldMap
                color="#aaaaaa"
                places={[
                  {
                    id: 'AR',
                    name: 'Arlington Renegades',
                    location: [32.705002, -97.122780],
                    color: '#6ab3e6',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/arlington', '_blank') },
                  },
                  {
                    name: 'D.C. Defenders',
                    location: [38.89511, -77.03637],
                    color: '#c80f2e',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/washington-dc', '_blank') },
                  },
                  {
                    name: 'Houston Roughnecks',
                    location: [29.749907, -95.358421],
                    color: '#c10130',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/houston', '_blank') },
                  },
                  {
                    name: 'Orlando Guardians',
                    location: [28.538336, -81.379234],
                    color: '#acfb09',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/orlando', '_blank') },
                  },
                  {
                    name: 'San Antonio Brahmas',
                    location: [29.424349, -98.491142],
                    color: '#fee202',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/san-antonio', '_blank') },
                  },
                  {
                    name: 'Seattle Sea Dragons',
                    location: [47.608013, -122.335167],
                    color: '#00843d',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/seattle', '_blank') },
                  },
                  {
                    name: 'St. Louis Battlehawks',
                    location: [38.627003, -90.199402],
                    color: '#002677',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/st-louis', '_blank') },
                  },
                  {
                    name: 'Vegas Vipers',
                    location: [36.114647, -115.172813],
                    color: '#ff0600',
                    onClick: (name) => { window.open('https://www.xfl.com/teams/las-vegas', '_blank') },
                  },
                ]}
                selectColor="brand"
                style={{height: 'auto', width: '80vw', marginTop: '3em', marginBottom: '-1em'}}
              />
            </div>
          {/* </Main> */}
          <CardBody pad="large">
            <div>
              <Heading>Welcome to Wolfpack Fantasy</Heading>
              <Paragraph>Signup now to play XFL Fantasy Football</Paragraph>
              <br/>
              <br/>

              <Link to='/auth'>
                <Button color={'#fcee09'} primary label="Login / Create an Account" />
              </Link>

            </div>
          </CardBody>
        </Card>
    </div>
  )
}

export default Dashboard;