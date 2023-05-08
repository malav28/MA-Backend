//Express Setup
const Express = require("express");
const app = Express();

// Dot Env Setup
let dotenv = require("dotenv").config();

// Default API
app.use(Express.json());
const message = "Backend Working ✌️";
app.get("/", async (req, res) => {
  return res.json(message);
});

const starts = async () => {
  try {
    app.listen(process.env.PORT, () =>
      console.log(
        `🔰 Server Running at Port : http://localhost:${process.env.PORT} `
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

starts();

//mongodb setup
const mongoose = require("mongoose");
const { setMaxIdleHTTPParsers } = require("http");
const { log } = require("console");
mongoose.set("strictQuery", false);

const AtlasConn = async () => { 
  try {
    await mongoose.connect(`${process.env.MongodbUri}`);
    console.log("🎋 Database Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
AtlasConn();


//Mongodb user schema

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

var Users = mongoose.model("user", userSchema);

//-Get All Users @../users
app.get("/users", async (req, res) => {

  const AllUsers = await Users.find();
  return res.status(200).json(AllUsers) && console.log("All Users Getted");
});

//-Add Admin @../adduser
app.post("/adduser", async (req, res) => {
  const newUser = new Users( req.body );
//   console.log(...req.body);
  const inserteduser = await newUser.save();
  console.log(res.statusCode);
  return res.status(200).json(inserteduser) && console.log("New User Added");
});


