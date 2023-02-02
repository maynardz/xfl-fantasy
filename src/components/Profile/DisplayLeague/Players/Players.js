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
    await fetch(`http://localhost:3000/league/${props.league.id}/players/all`, {
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

  // SORT PLAYERS ON FRONT END INSTEAD OF RUNNING ANOTHER FETCH 

  // const fetch_players_byPos = (pos) => {
  //   fetch(`http://localhost:3000/league/${props.league.id}/players/${pos}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${props.sessionToken}`
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //     setPlayers(json)
  //   })
  //   .catch(err => console.log(err))
  // }

  const addPlayer = async (player) => {
    console.log(player);
    await fetch(`http://localhost:3000/roster/${props.userID}/${props.league.id}/${player.playerId}/add`, {
      method: 'POST',
      body: JSON.stringify({
        fa: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error('Status code error:', res.status);
      })
      .then(json => {
        console.log(json);
        fetch_players();
      })
      .catch(error => console.log(error))
  }

  return (
    <Grommet>
      <DisplayPlayers players={players} setPlayers={setPlayers} list={list} setList={setList} fetch_players={fetch_players} userID={props.userID} league={props.league} sessionToken={props.sessionToken} addPlayer={addPlayer} />
    </Grommet>
  )
}

export default Players;