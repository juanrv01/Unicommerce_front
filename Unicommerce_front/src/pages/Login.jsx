import React from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div>
      <h2>Login</h2>
      {/*<form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>*/}
      <LoginForm />
    </div>
  );
}

export default Login;
