const AuthanticationManager = require("../managers/authantication.manager");

exports.signup = function (request, response) {
  AuthanticationManager.signup(request.body)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

exports.login = function (request, response) {
  AuthanticationManager.login(request.body)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};