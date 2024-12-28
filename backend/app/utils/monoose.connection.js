const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);

async function connectToMongo(DB_URL, retries = 0) {
  try {
    const uri = `${DB_URL}`;
    await mongoose.connect(uri, {
      dbName: "music-web-app",
    });
    console.log(`Connect to MongoDB: ${uri}`);
  } catch (error) {
    console.log(`Can not connect to MongoDB: ${error}`);
    if (retries < 5) {
      console.error(`MongoDB reconnecting attempt ${retries + 1}...`);
      setTimeout(() => connectToMongo(DB_URL, retries + 1), 5000);
    } else {
      console.error(
        `Failed to connect to MongoDB after ${5} attempts. Please check your connection.`
      );
    }
  }
}
async function disconnectFromMongo() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
}

module.exports = {
  connectToMongo,
  disconnectFromMongo,
};
