import React from 'react';
import APIURL from '../../../../helpers/environment';

import DisplayCreateLeague from './DisplayCreateLeague/DisplayCreateLeague';

import { Grommet, Form, FormField, TextInput, Box, Button } from 'grommet';
import { deepMerge } from "grommet/utils";

import { Keyboard } from 'grommet-icons';

import { useNavigate } from 'react-router-dom';

const customTheme = deepMerge(Grommet, {
  global: {
    focus: {
      border: {
        color: '#fcee09'
      }
    },
    control: {
      border: {
        color: '#fcee09'
      },
    }
  },
  formField: {
    border: {
      color: '#fcee09'
    }
  }
});

const CreateLeague = props => {
  // console.log(props);
  const navigate = useNavigate();

  const [value, setValue] = React.useState({
    league_name: '',
    league_type: '',
    league_size: 0,
    draft_type: ''
  });
  const [display, setDisplay] = React.useState({
    league_name: true,
    league_type: false,
    league_size: false,
    draft_type: false
  });

  const create_league = (e) => {
    e.preventDefault();

    fetch(`${APIURL}/user/${props.userID}/create-league`, {
      method: 'POST',
      body: JSON.stringify({
        league: {
          league_name: value.league_name,
          league_owner: props.userID,
          league_type: value.league_type,
          league_size: value.league_size,
          draft_type: value.draft_type
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(() => navigate('/dashboard'))
    .catch(err => console.log(err))
  }

  return (
    <Grommet theme={customTheme}>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999999', fontFamily: 'Arial' }}>
        <div style={{ textAlign: 'left' }}>
          <Form>
            {
              display.league_name ? (
                <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Keyboard color='#fcee09' />
                  </div>
                  <br/>
                  <FormField name="league-name" htmlFor="league-name-input-id" label="Give your league a name">
                    <TextInput id="league-name-input-id" name="league-name" value={value.league_name} onChange={(e) => setValue({ ...value, ['league_name']: e.target.value })} />
                  </FormField>
                  <br />
                  <Button disabled={ value.league_name === '' ? true : false } label='next' color='#fcee09' onClick={() => setDisplay({ ...display, ['league_name']: false, ['league_type']: true })} />
                </div>
              ) : display.league_type ? (
                <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Keyboard color='#fcee09' />
                  </div>
                  <h4 style={{ textAlign: 'center' }}>Choose a League Type</h4>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button color='#fcee09' label='Re-Draft' style={{ margin: '0.5em' }} onClick={() => setValue({ ...value, ['league_type']: 'Re-Draft' })} />
                    <Button disabled={true} color='#fcee09' label='Keeper' style={{ margin: '0.5em' }} />
                    <Button disabled={true} color='#fcee09' label='Dynasty' style={{ margin: '0.5em' }} />
                  </div>
                  <br />
                  <p style={{ textAlign: 'center', fontSize: '12.5px' }}>*Keeper and Dynasty leagues are still in development*</p>
                  <br />
                  <Button disabled={ value.league_type === '' ? true : false } label='next' color='#fcee09' onClick={() => setDisplay({ ...display, ['league_type']: false, ['league_size']: true })} />
                </div>
              ) : display.league_size ? (
                <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Keyboard color='#fcee09' />
                  </div>
                  <h4 style={{ textAlign: 'center' }}>Choose a League Size</h4>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button color='#fcee09' label='4' style={{ margin: '0.5em' }} onClick={() => setValue({ ...value, ['league_size']: 4 })} />
                    <Button color='#fcee09' label='6' style={{ margin: '0.5em' }} onClick={() => setValue({ ...value, ['league_size']: 6 })} />
                  </div>
                  <br />
                  <Button disabled={ value.league_size === 0 ? true : false } label='next' color='#fcee09' onClick={() => setDisplay({ ...display, ['league_size']: false, ['draft_type']: true })} />
                </div>
              ) : display.draft_type ? (
                <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Keyboard color='#fcee09' />
                  </div>
                  <h4 style={{ textAlign: 'center' }}>Choose a Draft Type</h4>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button color='#fcee09' label='Snake' style={{ margin: '0.5em' }} onClick={() => setValue({ ...value, ['draft_type']: 'Snake' })} />
                    <Button disabled={true} color='#fcee09' label='Linear' style={{ margin: '0.5em' }} />
                    <Button disabled={true} color='#fcee09' label='Auction' style={{ margin: '0.5em' }} />
                  </div>
                  <br />
                  <p style={{ textAlign: 'center', fontSize: '12.5px' }}>*Linear and Auction drafts are still in development*</p>
                  <br />
                  <Button type='submit' disabled={ value.draft_type === '' ? true : false } label='Create League' color='#fcee09' onClick={(e) => {
                    setDisplay({ ...display, ['draft_type']: false });
                    create_league(e);
                  }} />
                </div>
              ) : <div></div>
            }
            {/* <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box> */}
          </Form>
        </div>
      </div>
      {/* <DisplayCreateLeague leagueName={leagueName} setLeagueName={setLeagueName} trigger={trigger} setTrigger={setTrigger} fetch_user_leagues={props.fetch_user_leagues} leagues={props.leagues} value={value} setValue={setValue} create_league={create_league} leagueType={leagueType} setLeagueType={setLeagueType} leagueSize={leagueSize} setLeagueSize={setLeagueSize} draftType={draftType} setDraftType={setDraftType} /> */}
    </Grommet>
  )
}

export default CreateLeague;