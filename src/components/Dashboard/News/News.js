import React from 'react';

import { Card, CardHeader, CardBody } from 'grommet';

const News = props => {

  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetch_league_news();
  }, []);

  const fetch_league_news = async () => {
    await fetch('http://site.api.espn.com/apis/site/v2/sports/football/xfl/news')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setNews(json.articles)
      })
      .catch(err => console.log(err))
  }

  return (
    <div style={{ fontFamily: 'Arial', color: '#999999' }}>
      <div className='spacing_header' style={{ height: '150px', backgroundColor: '#0D151D', display: 'flex', alignItems: 'end' }}>
        <h2 style={{ fontFamily: 'Arial', color: '#999999', marginLeft: '1em' }}>XFL News</h2>
      </div>
      
      <div>
        {
          news.map((article, index) => {
            return (
              <div key={index} style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
                <Card  height="auto" width="90vw" background="#151B21">
                  <CardHeader pad="medium">
                    <iframe width="100%" height="auto" src={`https://www.espn.com/core/video/iframe?${article.links.web.href.substring('32')}&endcard=false`} allowFullScreen style={{ border: '0px' }}>
                    
                    </iframe>
                  </CardHeader>
                  <CardBody pad="medium">
                    <h4 style={{ margin: 0, color: '#999999' }}>{article.headline}</h4>
                    <br />
                    <p style={{ margin: '10px 0 10px 0', fontSize: '12.5px', color: '#999999' }}>{article.description}</p>
                  </CardBody>
                  {/* <CardFooter pad='medium' background="#02080D">
                    <p style={{ fontSize: '10px'}}>{Date(article.published)}</p>
                  </CardFooter> */}
                </Card>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default News;