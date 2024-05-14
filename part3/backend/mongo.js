const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.fghbckr.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model("Phone", phoneSchema);

const phone = new Phone({
  name: name,
  number: number,
});

if (name) {
  phone.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else{
    Phone.find({}).then((result)=>{
        console.log("phonebook:");
        result.forEach((phone)=>{
            console.log(phone.name," ",phone.number);
        });
        mongoose.connection.close();
    });
}
