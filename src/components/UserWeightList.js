import React, { useState } from 'react';
import moment from 'moment';

const UserWeightList = ({ loggedInUser, userWeights }) => {
  const currentDate = moment().format('YYYY-MM-DD');

  return (
    <div className="weight-list">
      {
        <ul>
          {userWeights
            .filter(w => w.userId === loggedInUser.id)
            .map(weight => {
              //console.log(weight);
              return (
                <li key={weight.id}>
                  start: {weight.startWeight}
                  goal:{weight.goalWeight}
                  Date: {weight.weighInDate}
                  weight: {weight.weight}
                </li>
              );
            })}
        </ul>
      }
    </div>
  );
};

export default UserWeightList;
