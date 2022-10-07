
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static('.'));
const httpServer = require("http").createServer(app);


httpServer.listen(3001, async () => {
  console.log(`Server is running on localhost:3001`);
});
