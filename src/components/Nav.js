import React, { useState } from 'react';
import qs from 'qs';

export default function Nav({ users, createUser, params }) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const onSubmit = ev => {
    ev.preventDefault();
    createUser({ firstName, lastName });
  };
  return (
    <div className="nav-container">
      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Weight</a>
        </li>
        <li>
          <a href="#">Water</a>
        </li>
        <li>
          <a href="#">Vitamins</a>
        </li>
        <li>
          <a href="#">Activity</a>
        </li>
      </ul>

      {/* <a
        href={`#${qs.stringify({ view: 'home' })}`}
        className={params.view === 'home' ? 'selected' : ''}
      >
        <img src={user.avatar} />
      </a> */}
    </div>
  );
}
