import React, { useState, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import { getHash } from './utils/Utils';
import UserForm from './components/UserForm';
import UserHomePage from './components/UserHomePage';
import UserGreeting from './components/UserGreeting';
import WeightForm from './components/WeightForm';
import Nav from './components/Nav';
import Header from './components/Header';
import UserWeightList from './components/UserWeightList';

const App = () => {
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [users, setUsers] = useState([]);
  const [userWeights, setUserWeights] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUserId, setActiveUserId] = useState('');
  const [params, setParams] = useState(qs.parse(getHash()));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
  }, []);

  //console.log(loggedInUser, 'user');
  const createUser = async user => {
    try {
      const created = (await axios.post('/api/users', user)).data;
      setUsers([...users, created]);
      setLoggedInUser(created);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const createUserWeight = async weight => {
    try {
      const created = (
        await axios.post(`/api/${loggedInUser.id}/weights`, weight)
      ).data;
      setUserWeights([...userWeights, created]);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  //delete
  const destroyUser = async userToDestroy => {
    console.log(userToDestroy);
    try {
      await axios.delete(`/api/users/${userToDestroy.id}`);
      setUsers(users.filter(user => user.id !== userToDestroy.id));
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
      console.log(ex.response.data.message, 'error log');
    }
  };

  const destroyUserWeight = async weightToDestroy => {
    try {
      await axios.delete(`/api/weights/${weightToDestroy.id}`);
      setUserWeights(
        userWeights.filter(weight => {
          console.log(weightToDestroy.id);
          weight.id !== weightToDestroy.id;
        })
      );

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
        setLoggedInUser={setLoggedInUser}
        createUser={createUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        params={params}
        setActiveUserId={setActiveUserId}
        activeUserId={activeUserId}
      />
      <Nav users={users} createUser={createUser} params={params} />
      {/* {!!error && <div className="error">{error}</div>} */}
      {//params.view === 'logged-in'
      isLoggedIn && (
        <UserGreeting
          loggedInUser={loggedInUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          destroyUser={destroyUser}
          setActiveUserId={setActiveUserId}
          activeUserId={activeUserId}
        />
      )}

      {params.view === 'logged-in' && (
        <UserHomePage
          loggedInUser={loggedInUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userWeights={userWeights}
          params={params}
        />
      )}

      <div className="forms">
        {params.view === 'signin' && (
          <UserForm createUser={createUser} params={params} />
        )}
        {params.view === 'weight' && (
          <WeightForm createUserWeight={createUserWeight} params={params} />
        )}
      </div>
      {params.view === 'weight' && (
        <UserWeightList
          loggedInUser={loggedInUser}
          userWeights={userWeights}
          params={params}
          destroyUserWeight={destroyUserWeight}
        />
      )}
    </div>
  );
};

export default App;
