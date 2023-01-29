import React from 'react';
import './Home.css';

// import wolfpack_logo from '../../assets/images/wolfpack_logo_2.png';
import wolfpack_pictoral from '../../assets/images/wolfpack_pictoral.png';

import { Card, CardBody, Main, Heading, Paragraph, Button } from 'grommet';

// import {
//   useNavigate
// } from "react-router-dom";

const Dashboard = props => {
  // const navigate = useNavigate();

  // const route_newpage = () => {
  //   navigate('/auth');
  // }

  return (
    <div>
      <Card height="auto" width="92vw" background="#151B21" style={{marginTop: '1em', marginBottom: '1em', fontFamily: 'Arial'}}>
          {/* <Header background="#fcee09" style={{ padding: '1em', fontWeight: '700' }}>
            LEAGUES
          </Header> */}
          <Main pad="large" background={'white'}>
            <img id='wolfpack_logo_dash' src={wolfpack_pictoral} alt='Wolfpack Fantasy Logo featuring a prominent W and P.' />
          </Main>
          <CardBody pad="large">
            <div>
              <Heading>Welcome to Wolfpack Fantasy</Heading>
              <Paragraph>Signup now to play XFL Fantasy Football</Paragraph>
              <br/>
              <br/>
              <Button 
              color={'#fcee09'} 
              primary label="Login / Create an Account" 
              onClick={() => props.setLoginToggle(!props.loginToggle)} />
            </div>
          </CardBody>
        </Card>
    </div>
  )
}

export default Dashboard;