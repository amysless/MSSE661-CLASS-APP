exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS amytasks(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'pending',
  PRIMARY KEY (id)
)`;

exports.ALL_TASKS = `SELECT * FROM amytasks`;

exports.SINGLE_TASKS = `SELECT * FROM amytasks WHERE id = ?`;

exports.INSERT_TASK = `INSERT INTO amytasks (name) VALUES (?)`;

exports.UPDATE_TASK = `UPDATE amytasks SET name = ?, status = ? WHERE id = ?`;

exports.DELETE_TASK = `DELETE FROM amytasks WHERE id = ?`;
