import React from 'react';

const Scores = props => {

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    fetch_scores();
  }, [])

  const fetch_scores = async () => {
    await fetch('https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=football&league=xfl')
      .then(res => res.json())
      .then(json => setData(json.sports[0].leagues[0]))
  }

  return (
    <div style={{ fontFamily: 'Arial', color: '#999999' }}>
      <h4 style={{ marginLeft: '1em' }}>Upcoming Games</h4>
    </div>
  )
}

export default Scores;