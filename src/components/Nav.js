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
          <a
            href={`#${qs.stringify({ view: 'weight' })}`}
            className={params.view === 'weight' ? 'selected' : ''}
          >
            Weight
          </a>
        </li>
        <li>
          <a
            href={`#${qs.stringify({ view: 'water' })}`}
            className={params.view === 'water' ? 'selected' : ''}
          >
            Water
          </a>
        </li>
        <li>
          <a
            href={`#${qs.stringify({ view: 'vitamin' })}`}
            className={params.view === 'vitamin' ? 'selected' : ''}
          >
            Vitamins
          </a>
        </li>
        <li>
          <a
            href={`#${qs.stringify({ view: 'activity' })}`}
            className={params.view === 'activity' ? 'selected' : ''}
          >
            Activity
          </a>
        </li>
      </ul>
    </div>
  );
}
