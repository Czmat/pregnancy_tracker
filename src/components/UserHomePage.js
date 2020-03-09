import React, { useState } from 'react';
import qs from 'qs';
import moment from 'moment';

const UserHomePage = ({ loggedInUser, isLoggedIn, userWeights }) => {
  const currentDate = moment();
  const myWeight = userWeights.filter(w => w.userId === loggedInUser.id);
  //console.log(currentDate);

  if (myWeight.length > 0) {
    const leastNumberOfDays = () => {
      let leastDays = currentDate.diff(
        moment(myWeight[0].weighInDate).format('MM/DD/YYYY'),
        'days'
      );

      for (let i = 0; i < myWeight.length; i++) {
        let weighInDate = moment(myWeight[i].weighInDate).format('MM/DD/YYYY');
        let diff = currentDate.diff(weighInDate, 'days');

        if (leastDays > diff) {
          leastDays = diff;
        }
      }
      return leastDays;
    };

    const currentWeight = myWeight.find(
      weight =>
        currentDate.diff(
          moment(weight.weighInDate).format('MM/DD/YYYY'),
          'days'
        ) === leastNumberOfDays()
    );

    //console.log(leastNumberOfDays(), currentWeight);

    const weightDiff = currentWeight.goalWeight - currentWeight.weight;
    return (
      <div>
        <div className="home-cards">
          <h3>Current Weight Info</h3>
          <div>Start weight: {currentWeight.startWeight}</div>
          <div>Goal weight: {currentWeight.goalWeight}</div>
          <div>Current weight: {currentWeight.weight}</div>
          <p>You have {weightDiff} pound to reach your goal</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>You have no logs</p>
      </div>
    );
  }
};

export default UserHomePage;
