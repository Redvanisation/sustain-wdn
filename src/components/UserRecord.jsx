import React from 'react';
import { Link } from 'react-router-dom';

const UserRecord = ({ id, name, email, activePathway }) => {
  return (
    <section className="user-record">
      <Link to={`/user/${id}`}>
        <h3 className="user-record__name">{name}</h3>
        <p className="user-record__email">
          {email}
        </p>
        <p className="user-record__pathway">
          {activePathway ? activePathway : 'bla bla bla'}
        </p>
    </Link>
      </section>
  );
};

export default UserRecord;
