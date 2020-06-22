import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl, validateEmail } from '../helpers';
import { UserContext } from '../providers/UsersProvider';


const Login = () => {
  const [email, setEmail] = useState('');
  const formRef = useRef(null);
  const userCtx = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/');
    }
  });


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
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        data
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log('success');
            localStorage.setItem('auth', res.data.auth_token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            formRef.current.reset();
            // history.push('/');
          }
        })
        .then(() => {
          axios({
            method: 'get',
            url: `${baseUrl}/api/v1/pathways`,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('auth')}`
            }
          })
            .then(res => localStorage.setItem('the-pathways', JSON.stringify(res.data)));
            history.push('/');
        })
        .catch(() => {
          alert('Invalid email/password combination');
        });
    }
  }

  return (
    <section className="form-section container">
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
      You don't have an account?<br />
      <span className="form__footer-link"><Link to="/register/user">Sign up for a youth account!</Link></span>
    </div>

  </section>
  )
};

export default Login;
