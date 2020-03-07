import React, { useState } from 'react';
import qs from 'qs';

export default function Header({
  users,
  setLoggedInUser,
  params,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [activeUserId, setActiveUserId] = useState('');
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginBtn = ev => {
    // ev.preventDefault();

    const activeUser = users.find(user => user.id === activeUserId);
    console.log(activeUserId, 'sub', activeUser);
    setLoggedInUser(activeUser);
    //setActiveUserId({});
  };

  const logoutBtn = ev => {
    ev.preventDefault();

    setLoggedInUser({});
    //setActiveUserId({});
  };

  return (
    <div className="header-container">
      <h1>Pregnancy Tracker</h1>

      <div>
        <label>User List </label>
        {/* <form onSubmit={loginLogoutBtn}> */}
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
        {isLoggedIn ? (
          <button
            onClick={e => {
              logoutBtn(e);
              setIsLoggedIn(false);
              setActiveUserId('');
            }}
          >
            Logout
          </button>
        ) : (
          <button
            disabled={!activeUserId}
            onClick={e => {
              loginBtn(e);
              setIsLoggedIn(true);
            }}
          >
            Login
          </button>
        )}
        {/* <a
          href={`#${qs.stringify({ view: 'logged-in' })}`}
          className={params.view === 'logged-in' ? 'selected button' : 'button'}
          onClick={e => {
            window.location = `#${qs.stringify({ view: 'logged-in' })}`;
            setIsLoggedIn(false);
            logoutBtn(e);
          }}
        >
          Logout
        </a>
        <a
          href={`#${qs.stringify({ view: 'signin' })}`}
          className={params.view === 'signin' ? 'selected button' : 'button'}
          onClick={e => {
            window.location = `#${qs.stringify({ view: 'signin' })}`;
            setIsLoggedIn(true);
            loginBtn(e);
          }}
        >
          Login
        </a> */}
        {/* </form> */}
        <div>
          <a
            href={`#${qs.stringify({ view: 'signin' })}`}
            className={params.view === 'signin' ? 'selected' : ''}
          >
            Signin
          </a>
        </div>
      </div>
    </div>
  );
}
