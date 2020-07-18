const controllers = require("./controller");

module.exports = (router) => {
  router.post("/v1/api/auth", controllers.auth);
};
