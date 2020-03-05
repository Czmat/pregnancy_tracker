import React, { useState } from 'react';

const UserForm = ({ createUser }) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const onSubmit = ev => {
    ev.preventDefault();
    createUser({ firstName, lastName });
  };
  return (
    <section>
      <form onSubmit={onSubmit}>
        <h2>Create User</h2>
        <label>First Name</label>
        <input
          value={firstName}
          onChange={ev => setfirstName(ev.target.value)}
        />
        <label>Last Name</label>
        <input value={lastName} onChange={ev => setlastName(ev.target.value)} />
        <button>Create</button>
      </form>
    </section>
  );
};

export default UserForm;
