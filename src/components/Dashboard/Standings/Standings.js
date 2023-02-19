import React from 'react'; 

import { Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet';

const Standings = props => {

  const [xflStandings, setXFLStandings] = React.useState({});

  React.useEffect(() => {
    fetch_standings();
  }, []);

  const fetch_standings = async () => {
    await fetch('https://site.api.espn.com/apis/v2/sports/football/xfl/standings')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setXFLStandings(json)
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <div className='spacing_header' style={{ height: '150px', backgroundColor: '#02080D', display: 'flex', alignItems: 'end' }}>
        <h2 style={{ fontFamily: 'Arial', color: '#999999', marginLeft: '1em' }}>XFL Standings</h2>
      </div>
      <div style={{ fontFamily: 'Arial', color: '#999999', fontSize: '12.5px' }}>
        {
          JSON.stringify(xflStandings) === '{}' ? <div></div> : (
            xflStandings.children.map((division, index) => {
              // console.log(division);
              return (
                <div key={index} style={{ backgroundColor: '#151B21', borderRadius: '5px', margin: '1em', padding: '1em', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ height: 'auto', width: '100%' }}>
                    <h2>{division.name}</h2>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell scope='col'></TableCell>
                          <TableCell scope='col' border='bottom'>
                            <b>Team</b>
                          </TableCell>
                          <TableCell scope='col' border='bottom'>
                            <b>W</b>
                          </TableCell>
                          <TableCell scope='col' border='bottom'>
                            <b>L</b>
                          </TableCell>
                          <TableCell scope='col' border='bottom'>
                            <b>T</b>
                          </TableCell>
                          <TableCell scope='col' border='bottom'>
                            <b>PCT</b>
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          division.standings.entries.map((team, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell><img src={team.team.logos[0].href} style={{ height: '15px', width: 'auto' }}/></TableCell>
                                <TableCell>{team.team.name}</TableCell>
                                <TableCell>{team.stats[17].displayValue}</TableCell>
                                <TableCell>{team.stats[9].displayValue}</TableCell>
                                <TableCell>{team.stats[15].displayValue}</TableCell>
                                <TableCell>{team.stats[16].displayValue}</TableCell>
                              </TableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                  </div>
                  </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default Standings;