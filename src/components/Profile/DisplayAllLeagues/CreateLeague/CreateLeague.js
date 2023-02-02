import React from 'react';

import DisplayCreateLeague from './DisplayCreateLeague/DisplayCreateLeague';

import { Grommet } from 'grommet';
import { deepMerge } from "grommet/utils";

const customTheme = deepMerge(Grommet, {
  global: {
    focus: {
      border: {
        color: '#00f0ff'
      }
    }
  },
  formField: {
    border: {
      color: '#fcee09'
    }
  }
});

const CreateLeague = props => {

  const [leagueName, setLeagueName] = React.useState('');
  const [trigger, setTrigger] = React.useState(false);
  const [value, setValue] = React.useState({});
  const [leagueType, setLeagueType] = React.useState('');
  const [leagueSize, setLeagueSize] = React.useState(0);
  const [draftType, setDraftType] = React.useState('');

  const create_league = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/user/${props.userID}/create-league`, {
      method: 'POST',
      body: JSON.stringify({
        league: {
          league_name: leagueName,
          league_owner: props.userID,
          league_type: leagueType,
          league_size: leagueSize,
          draft_type: draftType
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(() => props.fetch_user_leagues())
    .then(
      setLeagueName(''),
      setTrigger(!trigger)
    )
    .catch(err => console.log(err))
  }

  return (
    <Grommet theme={customTheme}>
      <DisplayCreateLeague leagueName={leagueName} setLeagueName={setLeagueName} trigger={trigger} setTrigger={setTrigger} fetch_user_leagues={props.fetch_user_leagues} leagues={props.leagues} value={value} setValue={setValue} create_league={create_league} leagueType={leagueType} setLeagueType={setLeagueType} leagueSize={leagueSize} setLeagueSize={setLeagueSize} draftType={draftType} setDraftType={setDraftType} />
    </Grommet>
  )
}

export default CreateLeague;