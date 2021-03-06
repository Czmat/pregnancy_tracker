const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/users', (req, res, next) => {
  db.readUsers()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/weights', (req, res, next) => {
  db.readWeights()
    .then(weights => res.send(weights))
    .catch(next);
});

app.get('/api/vitamins', (req, res, next) => {
  db.readVitamins()
    .then(vitamins => res.send(vitamins))
    .catch(next);
});

app.post('/api/users', (req, res, next) => {
  console.log(req.body);
  db.createUser(req.body)
    .then(user => res.send(user))
    .catch(next);
});
app.post('/api/:id/weights', (req, res, next) => {
  console.log(req.params.id);
  db.createWeight(req.body, req.params.id)
    .then(weight => res.send(weight))
    .catch(next);
});

app.post('/api/:id/vitamins', (req, res, next) => {
  console.log(req.params.id);
  db.createVitamin(req.body, req.params.id)
    .then(vitamin => res.send(vitamin))
    .catch(next);
});

//deletes
app.delete('/api/users/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  db.deleteUser(id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/weights/:id', (req, res, next) => {
  const id = req.params.id;
  db.deleteWeight(id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`,
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err),
  });
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(ex => console.log(ex));
