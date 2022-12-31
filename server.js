const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3000, function(){
    console.log("Servern är igång på port 3000");
})

const usersRouter = require("./routes/users");
//const boardRouter = require("./routes/board"); For future development.

app.use("/users", usersRouter);
//app.use("/board", boardRouter); For future development
app.use(express.static("public"))

 
module.exports = app;