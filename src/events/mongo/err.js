module.exports = {
  name: "err",
  execute(err) {
    console.log(`[Database Status]: error \n ${err}.`);
  },
};
