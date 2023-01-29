import React from 'react';

import { Box, Button, Collapsible, Text } from 'grommet';


const Invite = props => {
  return (
    <div>
      <Box align="start">
        <Button primary onClick={() => props.setOpen(!props.open)} label="＋ INVITE FRIENDS TO JOIN" style={{display: 'block', margin: '0 auto', backgroundColor: '#353200', border: '2px solid #fcee09', padding: '0.5em', color: '#fff', width: '80%'}} />
          <Collapsible open={props.open}>
            <Box
              background="light-2"
              round="medium"
              pad="medium"
              align="center"
              justify="center"
              style={{marginTop: '2em'}}
            >
              <Text>This is a box inside a Collapsible component</Text>
            </Box>
          </Collapsible>
        {/* <Text>This is other content outside the Collapsible box</Text> */}
      </Box>
    </div>
  )
}

export default Invite;