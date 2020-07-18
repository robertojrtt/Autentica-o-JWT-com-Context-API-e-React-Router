const Validator = require("fastest-validator");
const services = require("./services");
const bcrypt = require("bcryptjs");
const v = new Validator();
const Boom = require("boom");


module.exports = {
  create: async (ctx) => {
    const {
      response,
      request: { body },
    } = ctx;

    const schema = {
      firstName: { max: 60, min: 1, type: "string" },
      lastName: { max: 60, min: 1, type: "string" },
      email: { max: 155, min: 5, type: "string" },
      password: { max: 16, min: 4, type: "string" },
    };
    const errors = v.validate(body, schema);

    if (Array.isArray(errors) && errors.length) {
      response.status = 400;
      return (response.body = Boom.badRequest(null, errors));
    }

    const user = await services.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
    });

    if (user) {
      response.body = user;
    } else {
      response.body = { result: Boom.badRequest() };
    }
  },
};
