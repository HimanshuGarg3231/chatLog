const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
var chatLogData = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/chatLog/:user", function (req, res) {
  const userName = req.params.user;
  const userData = chatLogData[userName];
  res.send(userData);
});

app.post("/chatLog/:user", function (req, res) {
  const userName = req.params.user;
  const userData = req.body;
  if (!chatLogData[userName]) chatLogData[userName] = [];

  const newId = uuidv4();
  userData["ID"] = newId;
  chatLogData[userName].push(userData);
  res.send("POST request to the homepage id: " + newId);
});

app.delete("/chatlogs/:user", function (req, res) {
  const userName = req.params.user;
  let dataDeleted = "";
  if (chatLogData[userName]) {
    dataDeleted = chatLogData[userName];
    chatLogData[userName] = [];
  }
  res.send(dataDeleted);
});

app.delete("/chatlogs/:user/:messageId", function (req, res) {
  const userName = req.params.user;
  const mesgId = req.params.messageId;
  let dataDeleted = "";
  if (chatLogData[userName]) {
    const arra = chatLogData[userName];
    let newArr = arra.filter((val) => val.ID != mesgId);
    dataDeleted = arra.filter((val) => val.ID == mesgId);
    chatLogData[userName] = newArr;
  }
  res.send(dataDeleted);
});

app.listen(3000);
