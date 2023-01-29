import { Button, Form, FormField, TextInput, Box } from 'grommet';

const DisplayCreateLeague = (props) => {
  return (
    <div>
      {
        props.trigger ? null : (
          props.leagues.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <Button color='#fcee09' primary label="Create League" onClick={() => props.setTrigger(!props.trigger)} /> 
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Button color='#fcee09' primary label="New League" onClick={() => props.setTrigger(!props.trigger)} />
            </div>
          )
        )
      }
      {
        props.trigger ? (
          <div style={{backgroundColor: '#0B1115', borderRadius: '5px', padding: '2em'}}>
            <p style={{ textAlign: 'center', color: '#fcee09', fontWeight: 700 }}>CREATE A NEW LEAGUE</p>
            <br/>
            <br/>
            <Form
              value={props.value}
              onChange={nextValue => props.setValue(nextValue)}
              onSubmit={(e) => props.create_league(e)}
            >
              <FormField name="name" htmlFor="text-input-id" label="League name">
                <TextInput id="text-input-id" name="name" value={props.leagueName} onChange={(e) => props.setLeagueName(e.target.value)} />
              </FormField>
              <br/>
              <br/>
              <Box direction="row" gap="medium">
                <Button type="submit" color={'#fcee09'} primary label="Submit" />
              </Box>
            </Form>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div style={{textAlign: 'center'}}>
              <Button color={'#000203'} primary label="cancel" onClick={() => props.setTrigger(!props.trigger)} style={{fontSize: '14px', fontWeight: 600}} />
            </div>
          </div>
        ) : (
          null
        )
      }
    </div>
  )
}

export default DisplayCreateLeague;