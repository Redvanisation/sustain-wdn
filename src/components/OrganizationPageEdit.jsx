import React, { useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { baseUrl } from '../helpers';

const OrganizationPageEdit = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('auth');


  const formRef = useRef(null);

  useLayoutEffect(() => {
    if (currentUser.role !== 'organization') {
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
        url: `${baseUrl}api/v1/organizations/${currentUser.user_id}`,
        data,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log('success');
            formRef.current.reset();
            history.push(`/organization/${currentUser.user_id}`);
          }
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <section className="form-section container">
      <h2 className="title is-2 is-centered">Edit Profile</h2>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" name="name" type="text" placeholder={currentUser.name} defaultValue={currentUser.name} />
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
        <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" name="description" placeholder="Description..." defaultValue={currentUser.description}></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Industry</label>
          <div className="control">
            <input className="input" type="text" name="industry" placeholder="Industry" defaultValue={currentUser.industry} />
          </div>
        </div>

        <div className="control">
          <label className="radio title is-6">
            Do you have active internships?
          </label><br />
          <label className="radio">
            <input type="radio" name="interships" value={true} required />
            &nbsp;Yes
          </label>
          <label className="radio">
            <input type="radio" name="interships" value={false} />
            &nbsp;No
          </label>
        </div><br />

        <div className="control">
          <label className="radio title is-6">
            Do you have any active job opportunities?
          </label><br />
          <label className="radio">
            <input type="radio" name="jobs" value={true} required />
            &nbsp;Yes
          </label>
          <label className="radio">
            <input type="radio" name="jobs" value={false} />
            &nbsp;No
          </label>
        </div><br />

        <div className="control">
          <label className="radio title is-6">
            Do you have any other active opportunities?
          </label><br />
          <label className="radio">
            <input type="radio" name="other_opportunities" value={true} required />
            &nbsp;Yes
          </label>
          <label className="radio">
            <input type="radio" name="other_opportunities" value={false} />
            &nbsp;No
          </label>
        </div><br />

        <div className="field">
        <label className="label">Related subjects</label>
          <div className="control">
            <textarea className="textarea" name="related_subjects" placeholder="Related subjects..." defaultValue={currentUser.related_subjects} required></textarea>
          </div>
        </div>

        <div className="field">
        <label className="label">Related Activities</label>
          <div className="control">
            <textarea className="textarea" name="related_activities" placeholder="Related Activities..." defaultValue={currentUser.related_activities} required></textarea>
          </div>
        </div>

        <div className="field">
        <label className="label">Related Soft Skills</label>
          <div className="control">
            <textarea className="textarea" name="related_soft_skills" placeholder="Related Soft Skills..." defaultValue={currentUser.related_soft_skills} required></textarea>
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

  </section>
  );
};

export default OrganizationPageEdit;
