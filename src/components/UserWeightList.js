import React, { useState } from 'react';
import moment from 'moment';

const UserWeightList = ({ loggedInUser, userWeights, destroyUserWeight }) => {
  return (
    <div className="weight-list">
      {
        <div>
          {userWeights
            .filter(w => w.userId === loggedInUser.id)
            .map(weight => {
              const currentDate = moment(weight.weighInDate).format(
                'DD-MM-YYYY'
              );
              console.log(weight);
              return (
                <div key={weight.id} className="card">
                  <h3>Weigh-in on {currentDate}</h3>
                  <p>start: {weight.startWeight}</p>
                  <p>goal:{weight.goalWeight}</p>
                  <p>weight: {weight.weight}</p>
                  <div>
                    <button
                      className="button"
                      onClick={() => destroyUserWeight(weight)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      }
    </div>
  );
};

export default UserWeightList;
