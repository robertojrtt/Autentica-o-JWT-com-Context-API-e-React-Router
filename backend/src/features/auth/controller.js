require("dotenv/config");
const services = require("./services");
const Boom = require("boom");
const Validator = require("fastest-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const v = new Validator();

module.exports = {
  auth: async (ctx) => {
    const {
      response,
      request: { body },
    } = ctx;

    const schema = {
      email: { max: 155, min: 5, type: "string" },
      password: { max: 16, min: 4, type: "string" },
    };

    const errors = v.validate(body, schema);

    if (Array.isArray(errors) && errors.length) {
      response.status = 400;

      return (response.body = Boom.badRequest(null, errors));
    }

    const user = await services.auth({ email: body.email });

    if (user && bcrypt.compareSync(body.password, user.password)) {
      console.log("aqui");
      response.body = {
        result: jwt.sign(user, process.env.TOKEN_SECRET),
      };
    } else {
      response.status = 400;
      response.body = { result: Boom.unauthorized() };
    }
  },
};
