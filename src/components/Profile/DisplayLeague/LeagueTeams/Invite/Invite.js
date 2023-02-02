import React from 'react';

import { Box, Button, Collapsible, Text } from 'grommet';

const Invite = props => {
  return (
    <div>
      <Box align="center">
        <Button primary onClick={() => props.setOpen(!props.open)} label="＋ INVITE FRIENDS TO JOIN" style={{display: 'block', margin: '0 auto', backgroundColor: '#161207', border: '2px solid #fcee09', padding: '0.5em', color: '#fff', width: '80%'}} />
        <Collapsible open={props.open}>
          <Box
            background="light-2"
            round="medium"
            pad="medium"
            align="center"
            justify="center"
            style={{marginTop: '1.4em'}}
          >
            <Text>http://localhost:3000/i/{props.league.id}</Text>
          </Box>
        </Collapsible>
        {/* <Text>This is other content outside the Collapsible box</Text> */}
      </Box>
      <br/>
      <br/>
    </div>
  )
}

export default Invite;