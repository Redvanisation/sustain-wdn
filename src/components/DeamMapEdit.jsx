import React, { useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers/';

const DeamMapEdit = () => {
  const formRef = useRef(null);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('auth');

  useLayoutEffect(() => {
    if (!currentUser) {
      history.push('/auth');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
      const data = new FormData(formRef.current);
      axios({
        method: 'put',
        url: `${baseUrl}/api/v1/users/${currentUser.user_id}`,
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
  
  return (
      <section className="form-section container">
        <h2 className="title is-2 is-centered">Edit your dreams!</h2>
        <form className="form" ref={formRef} onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">What's the dream of your life?</label>
            <div className="control">
              <input className="input" name="life_dream" type="text" placeholder="Dream of your life" required />
            </div>
          </div>

          <div className="field">
            <label className="label">What's your dream for the community?</label>
            <div className="control">
              <input className="input" name="community_dream" type="text" placeholder="Your dream for the community" required />
            </div>
          </div>

          <div className="field">
            <label className="label">What's your dream for the world?</label>
            <div className="control">
              <input className="input" name="world_dream" type="text" placeholder="Your dream for the world" required />
            </div>
          </div>

          <input type="hidden" name="facilitator_id" value="1" />

          <div className="field is-grouped">
            <div className="control is-centered">
              <button className="button is-link">Submit</button>
            </div>
        </div>
      </form>

    </section>
  );
};

export default DeamMapEdit;
