const Application = require("./app/server");

require("dotenv").config();

const app = new Application(process.env.PORT, process.env.DB_URL);
app.start();
