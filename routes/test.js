const test = require("../controllers/test");

/**
 * CAUTION - these routes are public facing - do not put anything that exposes data client side
 */

module.exports = function (app) {
  app.route("/test").get(test);
};
