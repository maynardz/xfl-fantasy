import React from 'react';

import DisplayAllPlayers from './DisplayAllPlayers/DisplayAllPlayers';
import DisplaySinglePlayer from './DisplaySinglePlayer/DisplaySinglePlayer';

import { Grommet, Spinner } from 'grommet';

const Players = props => {
  console.log(props);

  const [players, setPlayers] = React.useState([]);
  const [selectedPlayer, setSelectedPlayer] = React.useState({});
  const [toggle, setToggle] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    playerList();
  }, []);

  const playerList = async () => {
    const playerRefs = await fetch('http://sports.core.api.espn.com/v2/sports/football/leagues/xfl/athletes?limit=781');
    const playerRefJson = await playerRefs.json();

    const playersReq = await playerRefJson.items.map(async (player_url) => fetch(player_url['$ref']));

    const playersRes = await Promise.all(playersReq);
    const errors = playersRes.filter((response) => !response.ok);

    if (errors.length > 0) {
      throw errors.map((response) => Error(response.statusText));
    }
    
    const playerJson = playersRes.map((response) => response.json());
    const data = await Promise.all(playerJson);

    const teamReq = await data.map( async (player) => fetch(player.team['$ref']));

    const teamRes = await Promise.all(teamReq);

    const teamJson = teamRes.map((response) => response.json());
    const teamData = await Promise.all(teamJson);

    const full = data.map((player, index) => ({
      ...player,
      team: teamData[index]
    }))

    setPlayers(full);
    setLoading(false);
  }

  // SORT PLAYERS ON FRONT END INSTEAD OF RUNNING ANOTHER FETCH 

  const addPlayer = async (player) => {
    console.log(player);
    await fetch(`http://localhost:3000/roster/${props.userID}/${props.league.id}/add`, {
      method: 'POST',
      body: JSON.stringify(),
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
        // fetch_players();
      })
      .catch(error => console.log(error))
  }

  const handle_toggle = (player) => {
    setSelectedPlayer(player);
    setToggle(!toggle);
  }

  return (
    <Grommet>    
      {
        loading ? (
          <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size='large' color={'#fcee09'} />
          </div>
        ) : !loading && toggle ? (
          <DisplaySinglePlayer selectedPlayer={selectedPlayer} toggle={toggle} setToggle={setToggle} setSelectedPlayer={setSelectedPlayer} />
        ) : (
            <div>
              <div className='spacing_header' style={{ height: '150px', backgroundColor: '#0D151D', display: 'flex', alignItems: 'end' }}>
                <h2 style={{ fontFamily: 'Arial', color: '#999999', marginLeft: '1em' }}>Available Players</h2>
              </div>
              {
                players.filter(player => player.position.abbreviation === 'QB' || player.position.abbreviation === 'RB' || player.position.abbreviation === 'WR' || player.position.abbreviation === 'TE' || player.position.abbreviation === 'K').map((player, index) => {
                  return (
                    <DisplayAllPlayers
                    key={player && player.id ? player.id : index}
                    player={player} index={index} handle_toggle={handle_toggle} addPlayer={addPlayer} />
                  )
                })
              }
            </div>
        )
      }

    </Grommet>
  )
}

export default Players;