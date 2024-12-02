const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
const users = [
  {
    userName: "Haris",
    userEmail: "haris18@gmail.com",
    userAge: "22",
    userUniqueId: 1
  },
  {
    userName: "Washid",
    userEmail: "washid110@gmail.com",
    userAge: "21",
    userUniqueId: 2
  },
  {
    userName: "Saqib",
    userEmail: "haris28@gmail.com",
    userAge: "22",
    userUniqueId: 3
  }
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req , res) => {
  res.render("home", {data: users});
});
app.post("/", (req , res) => {
  const {userName , userEmail , userAge , userUniqueId} = req.body;
  users.push({userName , userEmail , userAge , userUniqueId: parseInt(userUniqueId)});
  res.render("home", {data: users})
});
app.post("/delete", (req , res) => {
  const {userUniqueId} = req.body;
  const index = users.findIndex(user => user.userUniqueId === parseInt(userUniqueId));
  if(index !== -1) {
    users.splice(index , 1);
    };
    res.render("home", {data: users});
});
app.post("/update", (req , res) => {
  const {userUniqueId, userName , userEmail , userAge} = req.body;
  const user = users.find(user => user.userUniqueId === parseInt(userUniqueId) );
  if(user) {
    user.userName = userName,
    user.userEmail = userEmail,
    user.userAge = userAge
   
  };
  res.render("home", {data: users});
});
app.listen(port , () => {console.log(`Server isrunning on ${port}`)});
