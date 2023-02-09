import React from 'react';
import './DisplayCreateLeague.css';

import { Button, Form, FormField, TextInput, Box, Text } from 'grommet';

const DisplayCreateLeague = (props) => {

  const [active, setActive] = React.useState(false);
  const [active2, setActive2] = React.useState(false);
  const [active3, setActive3] = React.useState(false);
  const [active4, setActive4] = React.useState(false);
  const [active5, setActive5] = React.useState(false);
  const [active6, setActive6] = React.useState(false);
  const [active7, setActive7] = React.useState(false);

  return (
    <div>
      Create league
    </div>
  )
}

export default DisplayCreateLeague;






// {
//   props.trigger ? null : (
//     props.leagues.length === 0 ? (
//       <div style={{ textAlign: 'center' }}>
//         <Button color='#fcee09' primary label="Create League" onClick={() => props.setTrigger(!props.trigger)} /> 
//       </div>
//     ) : (
//       <div style={{ textAlign: 'center' }}>
//         <Button color='#fcee09' primary label="New League" onClick={() => props.setTrigger(!props.trigger)} />
//       </div>
//     )
//   )
// }
// {
//   props.trigger ? (
//     <div style={{backgroundColor: '#0B1115', borderRadius: '5px', padding: '2em'}}>
//       <p style={{ textAlign: 'center', color: '#fcee09', fontWeight: 700 }}>CREATE A NEW LEAGUE</p>
//       <br/>
//       <br/>
//       <Form
//         value={props.value}
//         onChange={nextValue => props.setValue(nextValue)}
//         onSubmit={(e) => props.create_league(e)}
//       >
//         <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
//           <FormField name="name" htmlFor="text-input-id" label="league name">
//             <TextInput id="league_name_input" name="name" value={props.leagueName} onChange={(e) => props.setLeagueName(e.target.value)} placeholder='Give your league a name' />
//           </FormField>
//           <p style={{ fontSize: '12px', marginLeft: '12px' }}>Don't worry, you'll be able to change this later</p>
//         </div>
        
//         <br/>

//         <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
//           <div>
//             <p style={{ marginLeft: '12px' }}>league type</p>
//             <p style={{ fontSize: '12px', marginLeft: '12px', marginTop: '-12px' }}>*Keeper and Dynasty leagues are still in development*</p>
//           </div>
//           <div id='league_type' style={{ display: 'flex', flexWrap: 'wrap'}}>
//             <Button className={active ? 'selected' : ''} color='#fcee09' primary label="Redraft" style={{ height: '75px', width: '115px', margin: '.5em' }} onClick={() => {
//               setActive(!active);
//               props.setLeagueType('Redraft');
//             }} />
//             <Button color='#fcee09' primary label="Keeper" style={{ height: '75px', width: '115px', margin: '.5em' }} disabled={true} />
//             <Button color='#fcee09' primary label="Dynasty" style={{ height: '75px', width: '115px', margin: '.5em' }} disabled={true} />
//           </div>
//         </div>

//         <br/>

//         <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
//           <div>
//             <p style={{ marginLeft: '12px' }}>league size</p>
//             <p style={{ fontSize: '12px', marginLeft: '12px', marginTop: '-12px' }}>This can also be changed later</p>
//           </div>
//           <div id='league_size' style={{ display: 'flex', flexWrap: 'wrap'}}>
//             <Button className={active2 ? 'selected' : ''} color='#fcee09' primary label="4" style={{ height: '50px', width: '75px', margin: '.5em' }} onClick={() => {
//               setActive2(!active2);
//               if (active3 || active4 || active5 || active6) {
//                 setActive3(false);
//                 setActive4(false);
//                 setActive5(false);
//                 setActive6(false);
//               }
//               props.setLeagueSize(4)
//             }} />  
//             <Button className={active3 ? 'selected' : ''} color='#fcee09' primary label="6" style={{ height: '50px', width: '75px', margin: '.5em' }} onClick={() => {
//               setActive3(!active3);
//               if (active2 || active4 || active5 || active6) {
//                 setActive2(false);
//                 setActive4(false);
//                 setActive5(false);
//                 setActive6(false);
//               }
//               props.setLeagueSize(6)
//             }} />  
//             <Button className={active4 ? 'selected' : ''} color='#fcee09' primary label="8" style={{ height: '50px', width: '75px', margin: '.5em' }} onClick={() => {
//               setActive4(!active4);
//               if (active2 || active3 || active5 || active6) {
//                 setActive2(false);
//                 setActive3(false);
//                 setActive5(false);
//                 setActive6(false);
//               }
//               props.setLeagueSize(8)
//             }} />  
//             <Button className={active5 ? 'selected' : ''} color='#fcee09' primary label="10" style={{ height: '50px', width: '75px', margin: '.5em' }} 
//             onClick={() => {
//               setActive5(!active5);
//               if (active2 || active3 || active4 || active6) {
//                 setActive2(false);
//                 setActive3(false);
//                 setActive4(false);
//                 setActive6(false);
//               }
//               props.setLeagueSize(10)
//             }} />  
//             <Button className={active6 ? 'selected' : ''} color='#fcee09' primary label="12" style={{ height: '50px', width: '75px', margin: '.5em' }} onClick={() => {
//               setActive6(!active6);
//               if (active2 || active3 || active4 || active5) {
//                 setActive2(false);
//                 setActive3(false);
//                 setActive4(false);
//                 setActive5(false);
//               }
//               props.setLeagueSize(12)
//             }} />  
//           </div>
//         </div>

//         <br/>

//         <div style={{ backgroundColor: '#151B21', padding: '1em', borderRadius: '5px' }}>
//           <div>
//             <p style={{ marginLeft: '12px' }}>draft type</p>
//           </div>
//           <p style={{ fontSize: '12px', marginLeft: '12px', marginTop: '-12px' }}>*Linear and Auction drafts are still in development*</p>
//           <div id='draft_type' style={{ display: 'flex', flexWrap: 'wrap'}}>
//             <Button className={active7 ? 'selected' : ''} color='#fcee09' primary label="Snake" style={{ height: '75px', width: '115px', margin: '.5em' }} onClick={() => {
//               setActive7(!active7);
//               props.setDraftType('Snake');
//             }} />
//             <Button color='#fcee09' primary label="Linear" style={{ height: '75px', width: '115px', margin: '.5em' }} disabled={true} />
//             <Button color='#fcee09' primary label="Auction" style={{ height: '75px', width: '115px', margin: '.5em' }} disabled={true} />
//           </div>
//         </div>
        
//         <br/>
//         <br/>
        
//         <Box direction="row" gap="medium">
//           <Button type="submit" color={'#fcee09'} primary label="Submit" style={{ marginLeft: '12px' }} />
//         </Box>
//       </Form>
//       <br/>
//       <br/>
//       <br/>
//       <div style={{textAlign: 'center'}}>
//         <Button color={'#000203'} primary label="cancel" style={{fontSize: '14px', fontWeight: 600}} 
//         onClick={() => {
//           props.setTrigger(!props.trigger);
//           props.setLeagueName('');
//           props.setLeagueType('');
//           props.setLeagueSize(0);
//           props.setDraftType('');
//           setActive(false);
//           setActive2(false);
//           setActive3(false);
//           setActive4(false);
//           setActive5(false);
//           setActive6(false);
//           setActive7(false);
//         }} />
//       </div>
//     </div>
//   ) : (
//     null
//   )
// }