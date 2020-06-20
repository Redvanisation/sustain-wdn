import React, { useState, useRef, useLayoutEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { baseUrl, validateEmail } from '../helpers';
// import { UserContext } from '../providers/UsersProvider';

const UserSignup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  // const userCtx = useContext(UserContext);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));


  const formRef = useRef(null);

  useLayoutEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  })

  const handleImage = (e) => {
    setSelectedImage(e.target.files[0]);
    const img = e.target.files[0];
    if (!img) return;
    if (img.type === 'image/png' || img.type === 'image/jpg' || img.type === 'image/jpeg') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      alert('Please upload an image of type PNG or JPG');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);

    if (password !== confirmPassword) {
      alert('Password and Password Confirmation do not match!');
    } else if (!emailValid) {
      alert('Please enter a valid email!')
    } else {
      const data = new FormData(formRef.current);
      axios({
        method: 'post',
        url: `${baseUrl}auth/users/register`,
        data,
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            formRef.current.reset();
            alert('Registered successfully');
            history.push('/auth');
          }
        })
        .catch(() => alert('Error registering!'));
    }
  }

  return (
    <section className="form-section container">
      <h2 className="title is-2 is-centered">User Sign up</h2>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" name="name" type="text" placeholder="Name" required />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" name="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="off" required />
          </div>
        </div>

        <div className="field">
          <label className="label">Password Confirmation</label>
          <div className="control">
            <input className="input" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Password Confirmation" autoComplete="off" required />
          </div>
        </div>

        <div className="field file has-name is-boxed is-centered">
          <label className="file-label">
            <input className="file-input" type="file" name="image" onChange={handleImage} />
            <span className="file-cta">
              <span className="file-icon">
                <FiUpload />

              </span>
              <span className="file-label">
                Choose an image...
              </span>
            </span>
            <span className="file-name">
              {selectedImage ? selectedImage.name : 'No profile image selected...'}
            </span>
          </label>
        </div>

        <input type="hidden" name="facilitator_id" value="3" />

        <div className="field is-grouped">
          <div className="control is-centered">
            <button className="button is-link" disabled={isDisabled}>Sign up</button>
          </div>
      </div>
    </form>
    
    <div className="is-centered">
      You have an account?
      <Link to="/auth"> Login!</Link>
    </div>

  </section>
  )
};

export default UserSignup;
