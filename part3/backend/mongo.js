/* eslint-disable no-undef */
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  process.exit(1);
}

const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.fghbckr.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);