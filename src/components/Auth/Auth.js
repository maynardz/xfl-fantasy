import React from 'react';
import './Auth.css';

import wolfpack_logo from '../../assets/images/wolfpack_logo_2.png';

import { Grommet, Form, FormField, TextInput, Box, Button, CheckBox } from 'grommet';
import { deepMerge } from "grommet/utils";

// import {
//   useNavigate
// } from "react-router-dom";

const customTheme = deepMerge(Grommet, {
  global: {
    focus: {
      border: {
        color: '#00f0ff'
      }
    }
  },
  formField: {
    border: {
      color: '#fcee09'
    }
  }
});

const Auth = props => {
  // const navigate = useNavigate();

  const [login, setLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [value, setValue] = React.useState({});

  // const route_newpage = () => {
  //   navigate('/profile');
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = login ? `http://localhost:3000/user/login` : `http://localhost:3000/user/signup`;

    const bodyObj = {
        user: {
            username: username,
            password: password
        }
      }
   
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            props.updateLocalStorage(json.sessionToken, json.user.username, json.user.id);
            props.setLoginToggle(!props.loginToggle)
        })
        .catch(err => alert(err))
  }

  const formToggle = () => {
    setLogin(!login);

    setUsername('');
    setPassword('');
  }

  return (
    <div className='auth_logo_container'>
      <img id='wolfpack_logo' src={wolfpack_logo} alt='Wolfpack Fantasy Logo featuring a prominent W and P.' />
      <Grommet theme={customTheme}>
        <Form
        value={value}
        onChange={nextValue => setValue(nextValue)}
        onSubmit={(e) => handleSubmit(e)}
        id='login_signup_form'
        >
          <div className='switch_container'>
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" defaultChecked onChange={formToggle} />
              <input type="radio" name="slide" id="signup" onChange={formToggle} />
              <label htmlFor="login" className="slide login">Login</label>
              <label htmlFor="signup" className="slide signup">Signup</label>
            <div className="slider-tab"></div>
        </div>
          </div>
          <FormField name="username" htmlFor="username-input-id" label="username" required={{ indicator: true }} >
            <TextInput id="text-input-id" name="username" onChange={ (e) => setUsername(e.target.value) } value={username} />
          </FormField>
          <FormField name="password" htmlFor="password-input-id" label="password" required={{ indicator: true }} >
            <TextInput id="password-input-id" name="password" type='password' onChange={ (e) => setPassword(e.target.value) } value={password} />
          </FormField>
          <Box direction="row" gap="medium">
            <Button id='login_signup_submit' type="submit" primary >
              {
                login ? 'Login' : 'Signup'
              }
            </Button>
          </Box>
        </Form>
      </Grommet>
    </div>
  )
}

export default Auth;