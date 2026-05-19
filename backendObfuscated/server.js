const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

let DB = process.env.DATABASE_LOCAL;
console.log('Database URI:', DB);

mongoose.connect(DB).then(() => {
  console.log('DB connection Successfully');
});

const port = 8000;
app.listen(port, () => {
  console.log('App Running on port: ' + port);
});