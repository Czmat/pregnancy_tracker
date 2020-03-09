import React, { useState } from 'react';
import qs from 'qs';

const UserGreeting = ({
  loggedInUser,
  isLoggedIn,
  destroyUser,
  setIsLoggedIn,
  setActiveUserId,
}) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>
          Welcome Back {loggedInUser.firstName}!{' '}
          <button
            className="button"
            onClick={e => {
              destroyUser(loggedInUser);

              setIsLoggedIn(false);
              setActiveUserId('');
              window.location = `#${qs.stringify({ view: 'signin' })}`;
            }}
          >
            Delete
          </button>
        </h1>
      ) : (
        // <p>If you like to delete {loggedInUser.firstName} <button>click me</button></p>
        <h1>Come Back Again</h1>
      )}
    </div>
  );
};

export default UserGreeting;
