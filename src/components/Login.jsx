import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl, validateEmail } from '../helpers';

const Login = () => {
  const [email, setEmail] = useState('');
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);

    if (!emailValid) {
      alert('Please enter a valid email!')
    } else {
      const data = new FormData(formRef.current);
      axios({
        method: 'post',
        url: `${baseUrl}auth/login`,
        data,
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            // history.push('/auth');
            console.log('success');
            console.log(res.data)
            formRef.current.reset();
          }
        })
        .catch(() => {
          alert('Invalid email/password combination');
        });
    }
  }

  return (
    <div className="container">
      <h2 className="title is-2 is-centered">Login</h2>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" name="password" type="password" placeholder="Password" autoComplete="off" required />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control is-centered">
            <button className="button is-link">Login</button>
          </div>
      </div>
    </form>
    
    <div className="is-centered">
      You don't have an account?
      <Link to="/register/user"> Sign up!</Link>
    </div>

  </div>
  )
};

export default Login;
