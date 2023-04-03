const mysql = require('mysql');
const queries = require('./queries/tasks.queries');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || '127.0.0.1';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'tododb';

// Create the connection with required details
const connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

// Connect to the database.
connection.connect(function(err) {
  console.log(password)
  if (error) throw error;
  console.log('Connected!');

  connection.query(queries.CREATE_TASKS_TABLE, function(error, result) {
    if (error) throw error;
    console.log('Table created or exists already!');
  });
});

module.exports = connection;
