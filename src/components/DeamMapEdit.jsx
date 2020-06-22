import React, { useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl, notify } from '../helpers/';

const DeamMapEdit = (props) => {
  const formRef = useRef(null);
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const user = props.location.user;
  const token = localStorage.getItem('auth');

  useLayoutEffect(() => {
    if (!(currentUser.role === 'user') && !(currentUser.role === 'facilitator')) {
      history.push('/auth');
    }
  });

  const getId = () => {
    if (currentUser.role === 'user') {
      return currentUser.user_id;
    } else {
      return props.location.user.id;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      const data = new FormData(formRef.current);
      axios({
        method: 'put',
        url: `${baseUrl}/api/v1/users/${getId()}`,
        data,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            notify('Dream map edited successfully');
            formRef.current.reset();
            history.push(`/user/${getId()}`);
          }
        })
        .catch(() => notify('Erorr editing the dream map!'));
  }
  
  return (
      <section className="form-section container">
        {
          user
            ? (
              <>
                <h2 className="title is-2 is-centered">Edit your dreams!</h2>
                <form className="form" ref={formRef} onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">What's the dream of your life?</label>
                    <div className="control">
                      <input className="input" name="life_dream" type="text" placeholder={user.life_dream ? user.life_dream : "Dream of your life"} defaultValue={user.life_dream} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">What's your dream for the community?</label>
                    <div className="control">
                      <input className="input" name="community_dream" type="text" placeholder={user.community_dream ? user.community_dream : "Your dream for the community"} defaultValue={user.community_dream} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">What's your dream for the world?</label>
                    <div className="control">
                      <input className="input" name="world_dream" type="text" placeholder={user.world_dream ? user.world_dream : "Your dream for the world"} defaultValue={user.world_dream} />
                    </div>
                  </div>

                  <input type="hidden" name="facilitator_id" value="1" />

                  <div className="field is-grouped">
                    <div className="control is-centered">
                      <button className="button is-link">Submit</button>
                    </div>
                </div>
              </form>
            </>
            )
            : history.push('/')
        }

    </section>
  );
};

export default DeamMapEdit;
