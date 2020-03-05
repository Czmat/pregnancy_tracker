import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import WeightForm from './components/WeightForm';
import Nav from './components/Nav';
import Header from './components/Header';
const App = () => {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [userWeights, setUserWeights] = useState([]);
  const [activeUserId, setActiveUserId] = useState('');

  const createUser = async user => {
    try {
      console.log(user);
      const created = (await axios.post('/api/users', user)).data;
      setUsers([...users, created]);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const createUserWeight = async weight => {
    try {
      console.log(weight);
      const created = (await axios.post(`/api/${activeUserId}/weights`, weight))
        .data;
      setUserWeights([...userWeights, created]);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  useEffect(() => {
    axios.get('/api/users').then(response => setUsers(response.data));
    axios.get('/api/weights').then(response => setUserWeights(response.data));
  }, []);

  return (
    <div>
      {/* <h1>Pregnancy Tracker</h1> */}
      <Header
        users={users}
        createUser={createUser}
        setActiveUserId={setActiveUserId}
      />
      <Nav users={users} createUser={createUser} />
      {!!error && <div className="error">{error}</div>}

      <div className="forms">
        <UserForm createUser={createUser} />
        <WeightForm createUserWeight={createUserWeight} />
      </div>
      <ul>
        {userWeights.map(weight => {
          console.log(weight);
          return (
            <li key={weight.id}>
              {weight.startWeight}
              {weight.userId}
            </li>
          );
        })}
      </ul>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
