require('dotenv').config();
const mongoose = require("mongoose");

const password = process.argv[2];

//const url = process.env.MONGODB_URI
const url = "mongodb+srv://fullstack:Fran_21071971@cluster0.fghbckr.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery", false);

mongoose.connect(url).
then(() => {
    console.log("connected to mongoDB");
})
.catch((error)=>{
    console.log(`connection refused: ${error.message}`)
});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  
  personSchema.set("toJSON", {
    getters: true,
    versionKey: false, //is the same 'delete ret._v'
    transform: (doc, ret, options) => {
      delete ret._id;
    },
  });
  
  const Person = mongoose.model("Person", personSchema);
  
  module.exports = mongoose.model("Person", personSchema);