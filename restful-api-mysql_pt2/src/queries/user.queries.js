exports.GET_ME_BY_USER_ID = `SELECT user_id, username, email FROM users where user_id = ?`;

exports.GET_ME_BY_USERNAME = `SELECT user_id, username,email FROM users where username = ?`;

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = `SELECT * from users WHERE user_id = ?`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * from users WHERE username = ?`;
