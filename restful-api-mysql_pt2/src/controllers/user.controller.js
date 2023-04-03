const jwt = require("jsonwebtoken");

const connection = require("../db-config");
const jwtconfig = require("../jwt-config");
const userQueries = require("../queries/user.queries");

exports.displayUser = function(request, response) {
    const token = request.headers["auth-token"];

    if (!token) {
        response
            .status(401)
            .send({ auth: false, message: "No Token Provided!"});
    }

    jwt.verify(token, jwtconfig.secret, function(error, decoded) {
        if (error) {
            response
                .status(500)
                .send({ auth: false, message: "Token Failed Authentication!"});
        }
        connection.query(userQueries.GET_ME_BY_USER_ID, [decoded.id], function(error, user) {
            if (error) {
                response
                    .status(500)
                    .send({ message: "User could not be found."});
            }
            if (!user) {
                response
                    .status(400)
                    .send({ message: "User does not exist."});
            }
            response
                .status(200)
                .send(user);
        });
    });
};