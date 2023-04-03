const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const jwtconfig = require('../jwt-config');
const authQueries = require('../queries/auth.queries');
const userQueries = require('../queries/user.queries');
const con = require('../db-config');

exports.registerUser = function(request, response) {
  const passwordHash = bcrypt.hashSync(request.body.password);

  connection.query(
    authQueries.INSERT_NEW_USER,
    [request.body.username, request.body.email, passwordHash],
    function(error, result) {
      if (error) {
        //   stop registeration
        console.log(error);
        response
          .status(500)
          .send({ msg: 'Could not register user. Please try again later.' });
      }

      connection.query(userQueries.GET_ME_BY_USERNAME, [request.body.username], function(
        error,
        user
      ) {
        if (error) {
          response.status(500);
          response.send({ msg: 'Could not retrieve user.' });
        }

        console.log(user);
        response.send(user);
      });
    }
  );
};

exports.login = function(request, response) {
  // check user exists
  console.log(request.body);
  connection.query(
    userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
    [request.body.username],
    function(error, user) {
      if (error) {
        response.status(500);
        response.send({ msg: 'Could not retrieve user.' });
      }

      console.log(user);
      //   validate entered password from database saved password
      bcrypt
        .compare(request.body.password, user[0].password)
        .then(function(validPass) {
          if (!validPass) {
            response.status(400).send({ msg: 'Invalid password!' });
          }
          //   create token
          const token = jwt.sign({ id: user[0].user_id }, jwtconfig.secret);
          response
            .header('auth-token', token) // { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
            .send({ auth: true, msg: 'Logged in!' });
        })
        .catch(console.log);
    }
  );
};

exports.updateUser = function(request, response) {
  // check user exists
  console.log(request.user);
  connection.query(
    userQueries.GET_ME_BY_USER_ID_WITH_PASSWORD,
    [request.user.id],
    function(error, user) {
      console.log(error, user);
      if (error) {
        response.status(500);
        response.send({ msg: 'Could not retrieve user.' });
      }

      console.log(user);
      console.log(request.body.username);
      console.log(request.body.password);

      const passwordHash = bcrypt.hashSync(request.body.password);

      // perform update
      connection.query(
        authQueries.UPDATE_USER,
        [request.body.username, request.body.email, passwordHash, user[0].id],
        function(error, result) {
          if (error) {
            console.log(error);
            response.status(500).send({ msg: 'Could not update user settings.' });
          }

          console.log(result);
          response.json({ msg: 'Updated succesfully!' });
        }
      );
    }
  );
};