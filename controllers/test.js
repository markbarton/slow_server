const logger = require(`../logger`);
const rp = require("request-promise-native");

module.exports = async function (req, res, next) {
  logger.info(`Testing Long Request Handling - hold for 60 seconds`);

  await sleep(60000);
  logger.info(`SENDING DONE`);
  res.send("done");
};

async function init() {
  console.log(1);
  await sleep(1000);
  console.log(2);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
