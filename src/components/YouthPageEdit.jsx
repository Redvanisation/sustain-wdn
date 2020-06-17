import React, { useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { baseUrl } from '../helpers';

const YouthPageEdit = (props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const user = props.location.user;
  const token = localStorage.getItem('auth');


  const formRef = useRef(null);

  useLayoutEffect(() => {
    if (!(currentUser.role === 'user') && !(currentUser.role === 'facilitator')) {
      history.push('/');
    }
  });

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
    
    if (password !== confirmPassword) {
      alert('Password and Password Confirmation do not match!');
    } else {
      const data = new FormData(formRef.current);
      axios({
        method: 'put',
        url: `${baseUrl}api/v1/users/${currentUser.user_id}`,
        data,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log('success');
            formRef.current.reset();
            history.push(`/user/${currentUser.user_id}`);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className="form-section container">
      {
        user 
        ? (
          <>
            <h2 className="title is-2 is-centered">Edit Profile</h2>
            <form className="form" ref={formRef} onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className="input" name="name" type="text" placeholder={user.name} defaultValue={user.name} />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" name="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="off" />
                </div>
              </div>

              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input className="input" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Password Confirmation" autoComplete="off" />
                </div>
              </div>

              <div className="field">
                <label className="label">Biography</label>
                <div className="control">
                  <textarea className="textarea" name="bio" type="text" placeholder={user.bio || 'Bio...'} defaultValue={user.bio} />
                </div>
              </div>

              <div className="field">
                <label className="label">Greatest Challenges</label>
                <div className="control">
                  <textarea className="textarea" name="greatest_challenges" type="text" placeholder={user.greatest_challenges || 'Greatest Challenges...'} defaultValue={user.greatest_challenges} />
                </div>
              </div>

              <div className="field">
                <label className="label">Greatest Assets</label>
                <div className="control">
                  <textarea className="textarea" name="greatest_assets" type="text" placeholder={user.greatest_assets || 'Greatest Assets...'} defaultValue={user.greatest_assets} />
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

              <div className="field is-grouped">
                <div className="control is-centered">
                  <button className="button is-link" disabled={isDisabled}>Update profile!</button>
                </div>
            </div>
          </form>
        </>
        )
        : (
          history.push('/')
        )
      }

  </section>
  );
};

export default YouthPageEdit;
