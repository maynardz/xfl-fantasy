import React from 'react';
import './Scores.css'

import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#fcee09',
      darker: '#053e85',
    },
    neutral: {
      main: '#999999',
      contrastText: '#fff',
    },
  },
});

const Scores = props => {

  const [data, setData] = React.useState([]);
  const [currentWeek, setCurrentWeek] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    fetch_scores();
  }, [])

  const fetch_scores = async () => {
    const eventRefs = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/xfl/scoreboard');
    const eventRefsJson = await eventRefs.json();
    console.log(eventRefsJson);
    setData(eventRefsJson.events);
  }

  return (
    <div style={{ fontFamily: 'Arial', color: '#999999' }}>
      {/* <div className='spacing_header' style={{ height: '150px', backgroundColor: '#02080D', display: 'flex', alignItems: 'end' }}>
        <h2 style={{ fontFamily: 'Arial', color: '#999999', marginLeft: '1em' }}>Scores</h2>
      </div> */}
      <div>
        <div style={{ padding: '1em', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
          <div>
            <h2>Week {page}</h2>
            <ThemeProvider theme={theme}>
              <Pagination color='primary' count={10} page={page} defaultPage={currentWeek} siblingCount={0} boundaryCount={0} onChange={handleChange} sx={{ padding: '0.25em', borderRadius: '5px' }} />
            </ThemeProvider>
          </div>
        </div>
        {
          data.length === 0 ? <div></div> :
          data.map((event, index) => {
            return (
              <div key={index}>
                {
                  event.status.type.state === 'pre' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em', textAlign: 'center', backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
                      <div>
                        <img src={event.competitions[0].competitors[1].team.logo} height='50px' />
                        <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{event.competitions[0].competitors[1].team.abbreviation}</b></p>
                        <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{event.competitions[0].competitors[1].records[0].summary}</p>
                        {/* <p style={{fontSize: '12.5px'}}>{event.odds.away.moneyLine}</p> */}
                      </div>
                  
                      <div style={{ fontSize: '12.5px'}}>
                        {event.status.type.shortDetail}
                      </div>
                      
                      
                      <div>
                        <img src={event.competitions[0].competitors[0].team.logo} height='50px' />
                        <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{event.competitions[0].competitors[0].team.abbreviation}</b></p>
                        <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{event.competitions[0].competitors[0].records[0].summary}</p>
                        {/* <p style={{fontSize: '12.5px'}}>{event.odds.home.moneyLine}</p> */}
                      </div>
                    </div>
                  ) : event.status.type.state === 'in' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em', textAlign: 'center', backgroundColor: '#151B21', padding: '0.25em', borderRadius: '5px' }}>
                      <div>
                        <img src={event.competitions[0].competitors[1].team.logo} height='50px' />
                        <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{event.competitions[0].competitors[1].team.abbreviation}</b></p>
                        <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{event.competitions[0].competitors[1].records[0].summary}</p>
                      </div>

                      <div>
                        <h1>{event.competitions[0].competitors[1].score}</h1>
                      </div>
                  
                      <div style={{ fontSize: '12.5px'}}>
                        {event.status.type.detail}
                      </div>

                      <div>
                        <h1>{event.competitions[0].competitors[0].score}</h1>
                      </div>

                      <div>
                        <img src={event.competitions[0].competitors[0].team.logo} height='50px' />
                        <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{event.competitions[0].competitors[0].team.abbreviation}</b></p>
                        <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{event.competitions[0].competitors[0].records[0].summary}</p>
                      </div>                      
                    </div>
                  ) : event.status.type.state === 'post' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em', textAlign: 'center', backgroundColor: '#151B21', padding: '0.25em', borderRadius: '5px' }}>
                      <div>
                        <img src={event.competitions[0].competitors[1].team.logo} height='50px' />
                        <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{event.competitions[0].competitors[1].team.abbreviation}</b></p>
                        <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{event.competitions[0].competitors[1].records[0].summary}</p>
                      </div>

                      <div>
                        <h1>{event.competitions[0].competitors[1].score}</h1>
                      </div>
                  
                      <div style={{ fontSize: '12.5px'}}>
                        {event.status.type.detail.toUpperCase()}
                      </div>

                      <div>
                        <h1>{event.competitions[0].competitors[0].score}</h1>
                      </div>

                      <div>
                        <img src={event.competitions[0].competitors[0].team.logo} height='50px' />
                        <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{event.competitions[0].competitors[0].team.abbreviation}</b></p>
                        <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{event.competitions[0].competitors[0].records[0].summary}</p>
                      </div>                      
                    </div>
                  ) : <div></div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Scores;