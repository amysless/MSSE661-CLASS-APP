const connection = require('../db-config');
const queries = require('../queries/tasks.queries');

exports.getAllTasks = function(request, response) {
  connection.query(queries.ALL_TASKS, function(error, result, fields) {
    if (error) {
      res.send(error);
    }
    res.json(result);
  });
};

exports.getTask = function(request, response) {
  connection.query(queries.SINGLE_TASKS, [req.params.taskId], function(error, result) {
    if (error) {
      response.send(error);
    }
    response.json(result);
  });
};

exports.createTask = function(request, response) {
  connection.query(queries.INSERT_TASK, [request.body.name], function(error, result) {
    if (error) {
      res.send(error);
    }
    console.log(result);
    response.json({ message: 'Number of records inserted into amytasks: ' + result.affectedRows });
  });
};


exports.updateTask = function(request, response) {
  connection.query(
    queries.UPDATE_TASK,
    [request.body.name, request.body.status, request.params.taskId],
    function(error, data) {
      if (error) {
        response.send(error);
      }
      response.json(data);
    }
  );
};

exports.deleteTask = function(request, response) {
  connection.query(queries.DELETE_TASK, [req.params.taskId], function(error) {
    if (error) {
      response.send(error);
    }
    response.json({ message: 'Deleted successfully.' });
  });
};
