const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const {
  connectToMongo,
  disconnectFromMongo,
} = require("./utils/monoose.connection");
const { AllRoutes } = require("./routes/routes");
const { NotFoundError, ErrorHandler } = require("./utils/error-handler");

require("dotenv").config();
class Application {
  constructor(PORT, DB_URL, REDIS_URL) {
    this.PORT = PORT;
    this.DB_URL = DB_URL;
    this.REDIS_URL = REDIS_URL;
    this.app = express();
    this.configServer();
    this.createServer();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  configServer() {
    this.app.use(cors());
    this.app.use(
      "/public",
      // AuthorizationGuard,
      express.static(path.join(__dirname, "..", "public"))
    );
    // this.app.use("/uploads", express.static("public/uploads"));
    this.app.set("trust proxy", true);
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  createServer() {
    this.server = this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }

  setupRoutes() {
    this.app.use(AllRoutes);
  }

  setupErrorHandling() {
    this.app.use(NotFoundError);
    this.app.use(ErrorHandler);
  }

  async start() {
    await connectToMongo(this.DB_URL);
  }
  async stop() {
    await disconnectFromMongo();
    this.server.close();
  }

  getApp() {
    return this.app;
  }
}

module.exports = Application;
