import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import './SignInForm.scss';

const SignInForm = () => {
  const [error, setError] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const transaction = await oktaAuth.signIn({
        username,
        password,
      });
      if (transaction.status === 'SUCCESS') {
        setSessionToken(transaction.sessionToken);
        oktaAuth.signInWithRedirect({
          sessionToken: transaction.sessionToken,
        });
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
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
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form__label" htmlFor="username">
          Username
          <input className="form__input" id="username" type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label className="form__label" htmlFor="password">
          Password
          <input className="form__input" id="password" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button className="form__btn" type="submit">Login</button>
      </form>
      {error && <p className="errormessage">Something went wrong!</p>}
    </>
  );
};

export default SignInForm;
