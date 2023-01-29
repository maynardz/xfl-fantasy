import React from 'react';

import DisplayPlayers from './DisplayPlayers/DisplayPlayers';

import { Grommet } from 'grommet';

const Players = props => {

  const [players, setPlayers] = React.useState([]);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch_players();
  }, [])

  const fetch_players = async () => {
    await fetch(`http://localhost:3000/players/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setPlayers(json)
    })
    .catch(err => console.log(err))
  }

  const fetch_players_byPos = (pos) => {
    fetch(`http://localhost:3000/players/${pos}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setPlayers(json)
    })
    .catch(err => console.log(err))
  }

  return (
    <Grommet>
      <DisplayPlayers players={players} setPlayers={setPlayers} list={list} setList={setList} fetch_players={fetch_players} fetch_players_byPos={fetch_players_byPos} />
    </Grommet>
  )
}

export default Players;