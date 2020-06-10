import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { baseUrl } from '../helpers/';

const Signup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const formRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleImage = (e) => {
    setSelectedImage(e.target.files[0]);
    const img = e.target.files[0];
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
            // history.push('/auth');
            console.log('success');
            formRef.current.reset();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    // <div className="container">
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

        <div className="field file has-name">
          <label className="file-label">
            <input className="file-input" type="file" name="image" onChange={handleImage} />
            <span className="file-cta">
              <span className="file-icon">
                <FiUpload />

              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
            <span className="file-name">
              {selectedImage ? selectedImage.name : 'No image selected'}
            </span>
          </label>
        </div>

        <input type="hidden" name="facilitator_id" value="1" />


        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" disabled={isDisabled}>Submit</button>
          </div>
      </div>
    </form>
  // </div>
  )
};

export default Signup;
