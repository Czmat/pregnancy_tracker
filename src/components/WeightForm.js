import React, { useState } from 'react';
import moment from 'moment';

const WeightForm = ({ createUserWeight }) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const [weight, setWeight] = useState({
    weighInDate: currentDate,
    weight: 150,
    startWeight: 150,
    goalWeight: 120,
  });
  const handleChange = e => {
    const change = {};
    change[e.target.name] = e.target.value;
    setWeight({ ...weight, ...change });
  };

  const onSubmit = ev => {
    ev.preventDefault();
    createUserWeight(weight);
  };

  console.log(currentDate);
  return (
    <section>
      <h2>Weight Goals</h2>

      <form onSubmit={onSubmit}>
        <ul>
          <li>
            <label>Start Weight: </label>
            <input
              onChange={handleChange}
              value={weight.startWeight}
              name="startWeight"
              // type="range"
              // className="custom-range"
              // min="0"
              // max="350"
              // step="1"
              // id="customRange3"
            />
          </li>
          <li>
            <label>Goal Weight: </label>
            <input
              name="goalWeight"
              value={weight.goalWeight}
              onChange={handleChange}
            />
          </li>
          <li>
            <label>Weigh-in Date: </label>
            <input
              name="weighInDate"
              type="date"
              defaultValue={currentDate}
              value={weight.weighInDate}
              onChange={handleChange}
            />
          </li>
          <li>
            <label>Weigh-in: </label>
            <input
              name="weight"
              value={weight.weight}
              onChange={handleChange}
            />
          </li>
        </ul>
        <button>Create</button>
      </form>
    </section>
  );
};

export default WeightForm;
