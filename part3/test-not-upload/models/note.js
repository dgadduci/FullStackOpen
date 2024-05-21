require('dotenv').config();
const mongoose = require("mongoose");

const password = process.argv[2];

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false);

mongoose.connect(url).
then(() => {
    console.log("connected to mongoDB");
})
.catch((error)=>{
    console.log(`connection refused: ${error.message}`)
});

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  getters: true,
  versionKey: false, //is the same 'delete ret._v'
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = mongoose.model("Note", noteSchema);
