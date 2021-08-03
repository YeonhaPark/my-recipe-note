import express from 'express';

const app = express();

app.get('/sky/:id', (req, res, next) => {
  console.log('req::', req.params);
  console.log('query::', req.query);
  res.send(`hi!`);
});
app.listen(8081);
