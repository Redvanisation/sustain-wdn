import React, { useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers';

const AddOpportunity = () => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const formRef = useRef(null);


  useLayoutEffect(() => {
    if (currentUser.role !== 'organization') {
      history.push('/');
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);
    axios({
      method: 'post',
      url: `${baseUrl}/api/v1/opportunities`,
      data,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth')}`
      }
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          formRef.current.reset();
          alert('Opportunity added successfully');
          history.push(`/organization/${currentUser.user_id}`);
        }
      })
      .catch(() => alert('Error adding the opportunity!'));
  }


  return (
    <section className="form-section container">
      <h2 className="title is-2 is-centered">Add Opportunity</h2>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" name="name" type="text" placeholder="Name" required />
          </div>
        </div>

        <div className="field">
        <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" name="description" placeholder="Description..."></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Type</label>
          <div className="control">
            <input className="input" name="type" type="text" placeholder="Type" required />
          </div>
        </div>

        <div className="field">
          <label className="label">Related field</label>
          <div className="control">
            <input className="input" name="related_field" type="text" placeholder="Related field" required />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control is-centered">
            <button className="button is-link">Submit</button>
          </div>
      </div>
    </form>

  </section>
  )
};

export default AddOpportunity;
