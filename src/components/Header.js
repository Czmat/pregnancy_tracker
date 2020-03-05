import React, { useState } from 'react';
import qs from 'qs';

export default function Header({ users, setActiveUserId, params }) {
  // const [activeUserId, setActiveUserId] = useState({});

  const onSubmit = ev => {
    ev.preventDefault();
    console.log('sub');
  };
  return (
    <div className="header-container">
      <h1>Pregnancy Tracker</h1>

      <div className="col-auto my-1">
        <label>User List </label>
        <form onSubmit={onSubmit}>
          <select
            onChange={e => {
              setActiveUserId(e.target.value);
            }}
          >
            <option defaultValue>Select User</option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              );
            })}
          </select>
          <button type="submit">submit</button>
        </form>
      </div>

      {/* <a
        href={`#${qs.stringify({ view: 'home' })}`}
        className={params.view === 'home' ? 'selected' : ''}
      >
        <img src={user.avatar} />
      </a> */}
      {/* <form onSubmit={onSubmit}>
        <h2>Create User</h2>
        <label>First Name</label>
        <input
          value={firstName}
          onChange={ev => setfirstName(ev.target.value)}
        />
        <label>Last Name</label>
        <input value={lastName} onChange={ev => setlastName(ev.target.value)} />
        <button>Create</button>
      </form> */}
    </div>
  );
}
