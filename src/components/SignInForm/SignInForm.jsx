import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import './SignInForm.scss';

const SignInForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();

    /* Sort out error handling */
    oktaAuth.signInWithCredentials({ username, password })
      .then(res => {
        console.log(res.sessionToken);
        setSessionToken(res.sessionToken);
        oktaAuth.signInWithRedirect({ sessionToken });
      })
      .catch(err => console.log('Found an error', err));
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    return null;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="username">
        Username
        <input id="username" type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignInForm;
