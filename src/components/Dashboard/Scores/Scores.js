import React from 'react';
import './Scores.css'

import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LeagueTeams from '../Teams/Teams';

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

  const [previousWeekData, setPreviousWeekData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [currentWeek, setCurrentWeek] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch_scores();
  }, [])
  
  const handleChange = (event, value) => {
    setPage(value);
    fetch_scores_forWeek(value);
  };

  const fetch_scores = async () => {
    const eventRefs = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/xfl/scoreboard');
    const eventRefsJson = await eventRefs.json();
    console.log(eventRefsJson);
    setData(eventRefsJson.events);
    setPage(eventRefsJson.week.number);
    setCurrentWeek(eventRefsJson.week.number);
  }

  const fetch_scores_forWeek = async (weekNum) => {
    const eventsRefs = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/xfl/seasons/2023/types/2/weeks/${weekNum}/events`);
    const eventRefsJson = await eventsRefs.json();
    // console.log(eventRefsJson);

    const eventReq = eventRefsJson.items.map(async (eventObj) => fetch(eventObj['$ref']));
    const eventRes = await Promise.all(eventReq);
    // console.log(eventRes);

    const eventJson = eventRes.map((response) => response.json());
    const data = await Promise.all(eventJson);

    // teams, score, record

    // TEAMS
    let teamsArr = [];

    const eventCompetitors = data.map((event, index) => {
      console.log(event);
      event.competitions[0].competitors.map((team) => teamsArr.push(team))
    });
    console.log(teamsArr);

    const teamReq = teamsArr.map((compTeam) => fetch(compTeam.team['$ref']));

    const teamRes = await Promise.all(teamReq);

    const teamJson = teamRes.map((response) => response.json());
    const teamData = await Promise.all(teamJson)
    
    let teamDataRec = [ [teamData[0], teamData[1]], [teamData[2], teamData[3]], [teamData[4], teamData[5]], [teamData[6], teamData[7]] ];

    // SCORE
    const scoreReq = teamsArr.map((compTeam) => fetch(compTeam.score['$ref']));

    const scoreRes = await Promise.all(scoreReq);

    const scoreJson = scoreRes.map((response) => response.json());
    const scoreData = await Promise.all(scoreJson);

    let scoreDataRec = [ [scoreData[0], scoreData[1]], [scoreData[2], scoreData[3]], [scoreData[4], scoreData[5]], [scoreData[6], scoreData[7]] ];

    // RECORD
    const recordReq = teamsArr.map((compTeam) => fetch(compTeam.record['$ref']));

    const recordRes = await Promise.all(recordReq);

    const recordJson = recordRes.map((response) => response.json());
    const recordData = await Promise.all(recordJson);

    let recordDataRec = [ [recordData[0], recordData[1]], [recordData[2], recordData[3]], [recordData[4], recordData[5]], [recordData[6], recordData[7]] ];

    const full = data.map((event, index) => ({
      ...event,
      competitors: teamDataRec[index],
      score: scoreDataRec[index],
      record: recordDataRec[index]
    }));

    console.log(full);
    setPreviousWeekData(full);
  }

  const getDate = week => {
    let dateStr = week;
    let [yyyy,mm,dd,hh,mi] = dateStr.split(/[/:\-T-Z]/);
    return `${dd}-${mm}-${yyyy} ${hh}:${mi}`
  }

  return (
    <div style={{ fontFamily: 'Arial', color: '#999999' }}>
      <div className='spacing_header' style={{ height: '150px', backgroundColor: '#0D151D', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <h2 style={{ textAlign: 'center' }}>Week {page}</h2>
          <ThemeProvider theme={theme}>
            <Pagination count={10} page={page} defaultPage={currentWeek} siblingCount={0} boundaryCount={0} onChange={handleChange} sx={{ padding: '0.25em', borderRadius: '5px', button: { color: '#999999'} }} />
          </ThemeProvider>
        </div>
      </div>
      <div>
        {
          currentWeek === page ? (
            data.map((event, index) => {
              return (
                <div key={index}>
                  {
                    event.status.type.state === 'pre' ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em 0 1em 0', textAlign: 'center', padding: '0.25em', borderRadius: '5px' }}>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em 0 1em 0', textAlign: 'center', padding: '0.25em', borderRadius: '5px' }}>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em 0 1em 0', textAlign: 'center', padding: '0.25em', borderRadius: '5px' }}>
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
          ) : (
            previousWeekData.length === 0 ? <div></div> : (
              previousWeekData.map((week, index) => {
                console.log(week);
                return (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', 'alignItems': 'center', margin: '1em 0 1em 0', textAlign: 'center', padding: '0.25em', borderRadius: '5px' }}>
                    <div>
                      <img src={week.competitors[1].logos[0].href} height='50px' />
                      <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{week.competitors[1].abbreviation}</b></p>
                      <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{week.record[1].items[0].summary}</p>
                    </div>

                    <div>
                      <h1>{week.score[1].displayValue}</h1>
                    </div>
                
                    <div style={{ fontSize: '12.5px'}}>
                      {
                        page > currentWeek ? getDate(week.date) : 'FINAL'
                      }
                    </div>

                    <div>
                      <h1>{week.score[0].displayValue}</h1>
                    </div>
                    
                    <div>
                      <img src={week.competitors[0].logos[0].href} height='50px' />
                      <p style={{ margin: '15px', marginTop: '-0.1em' }}><b>{week.competitors[0].abbreviation}</b></p>
                      <p style={{ marginTop: '-0.75em', fontSize: '12.5px' }}>{week.record[0].items[0].summary}</p>
                    </div>
                  </div>
                )
              })
            )
          )
        }
      </div>
    </div>
  )
}

export default Scores;