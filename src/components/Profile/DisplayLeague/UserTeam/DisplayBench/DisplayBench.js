import React from 'react';

const colors = {
  qb: '#ff003c',
  rb: '#fcee09',
  wr: '#00f0ff',
  te: '#07C613',
  k: '#FC7909',
  def: '#5F12AA'
}

const DisplayBench = props => {
  return (
    <div>
      {
        props.team.bench.map(player => (
          <div key={player.playerId}>
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

export default DisplayBench;