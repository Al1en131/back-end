const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 1013;
const server = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

server.listen(PORT, () =>
  console.log(`Server already running at http://127.0.0.1:${PORT}`)
);
