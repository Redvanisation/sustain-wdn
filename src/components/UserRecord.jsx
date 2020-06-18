import React from 'react';
import { Link } from 'react-router-dom';

const UserRecord = ({ id, name, email, activePathway, user }) => {
  return (
    <section className="user-record">
      <Link to={{
        pathname: `/user/${id}`,
        user
      }}>
        <h3 className="user-record__name">
          Name: {name}
        </h3>
        <p className="user-record__email">
          Email: {email}
        </p>
        <p className="user-record__pathway">
          Active Pathway: {activePathway ? activePathway : 'No active pathway yet'}
        </p>
      </Link>

    </section>
  );
};

export default UserRecord;
