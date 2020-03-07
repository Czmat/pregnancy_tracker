import React, { useState } from 'react';
import qs from 'qs';

const UserHomePage = ({ loggedInUser, isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>
          Welcome Back {loggedInUser.firstName}! <button>X</button>
        </h1>
      ) : (
        <h1>Come Back Again</h1>
      )}
    </div>
  );
};

export default UserHomePage;
