import React from 'react';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <div>
      <h2>Register</h2>
      {/*<form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form> */}
      <RegisterForm />
    </div>
  );
}
export default Register;
