/* eslint-disable no-undef */
const mongoose = require("mongoose");

// const password = process.argv[2];

const url = process.env.MONGODB_URI
mongoose.set("strictQuery", false);

mongoose.connect(url).
then(() => {
    console.log("connected to mongoDB");
})
.catch((error)=>{
    console.log(`connection error ${error}`)
});

const phoneSchema = new mongoose.Schema({
    name: {
      type:String,
      minLength:3,
      required:true,
    },
    number: {
      type:String,
      minLength:8,
      required:true,
      validate: {
        validator: (v) =>{
          return /\d{2,3}-\d/.test(v);
        }
      }
    },
  });
  
  phoneSchema.set("toJSON", {
    getters: true,
    versionKey: false, //is the same 'delete ret._v'
    transform: (doc, ret) => {
      delete ret._id;
    },
  });
  
  module.exports = mongoose.model("Phone", phoneSchema);