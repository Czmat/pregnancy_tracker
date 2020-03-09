const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgress://localhost/pregnancy_tracker_db'
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS weights;
  DROP TABLE IF EXISTS vitamins;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id UUID PRIMARY KEY default uuid_generate_v4(),
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    CHECK (char_length("lastName")> 0),
    CHECK (char_length("firstName")> 0)
    );
  CREATE TABLE weights(
    id UUID PRIMARY KEY default uuid_generate_v4(),
    "weighInDate" DATE NOT NULL default CURRENT_DATE,
    weight INTEGER NOT NULL,
    "startWeight" INTEGER NOT NULL,
    "goalWeight" INTEGER NOT NULL,
    "userId" UUID REFERENCES users(id)
  );
  CREATE TABLE vitamins(
    id UUID PRIMARY KEY default uuid_generate_v4(),
    "isTakenDate" DATE NOT NULL default CURRENT_DATE,
    "isTaken" BOOLEAN default false,
    "userId" UUID REFERENCES users(id)
    );
    INSERT INTO users("firstName", "lastName") values('lucy', 'goosy');
    INSERT INTO users("firstName", "lastName") values('moe', 'shmow');
  `;
  await client.query(SQL);

  const [David, Chaise] = await Promise.all([
    createUser({ firstName: 'David', lastName: 'Brodie' }),
    createUser({ firstName: 'Chaise', lastName: 'Matev' }),
  ]);
  await Promise.all([
    // createWeight({
    //   weighInDate: '2020-03-03',
    //   weight: 150,
    //   startWeight: 150,
    //   goalWeight: 120,
    //   userId: Chaise.id,
    // }),
    // createWeight({
    //   weighInDate: '2020-03-03',
    //   weight: 170,
    //   startWeight: 160,
    //   goalWeight: 200,
    //   userId: David.id,
    // }),
  ]);
};

const readUsers = async () => {
  return (await client.query('SELECT * from users')).rows;
};

const createUser = async user => {
  const SQL =
    'INSERT INTO users("firstName", "lastName") values($1, $2) returning *';
  return (await client.query(SQL, [user.firstName, user.lastName])).rows[0];
};

const deleteUser = async id => {
  const SQL = 'DELETE FROM users WHERE id=$1';
  await client.query(SQL, [id]);
};

const readWeights = async () => {
  return (await client.query('SELECT * from weights')).rows;
};

const createWeight = async (
  { weighInDate, weight, startWeight, goalWeight, userId },
  id
) => {
  const SQL =
    'INSERT INTO weights("weighInDate", weight, "startWeight",  "goalWeight", "userId") values($1, $2, $3, $4, $5) returning *';
  return (
    await client.query(SQL, [weighInDate, weight, startWeight, goalWeight, id])
  ).rows[0];
};

const deleteWeight = async id => {
  const SQL = 'DELETE FROM weights WHERE id=$1';
  await client.query(SQL, [id]);
};

const readVitamins = async () => {
  return (await client.query('SELECT * from vitamins')).rows;
};

const createVitamin = async ({ isTakenDate, isTaken, userId }, id) => {
  const SQL =
    'INSERT INTO vitamins("isTakenDate", "isTaken", "userId") values($1, $2, $3) returning *';
  return (await client.query(SQL, [isTakenDate, isTaken, id])).rows[0];
};

const updateVitamin = async department => {
  const SQL = 'UPDATE departments set name=$1 WHERE id=$2 returning *';
  const response = await client.query(SQL, [department.name, department.id]);
  return response.rows[0];
};

module.exports = {
  sync,
  readUsers,
  createUser,
  readWeights,
  createWeight,
  deleteUser,
  deleteWeight,
  readVitamins,
  createVitamin,
  updateVitamin,
};
