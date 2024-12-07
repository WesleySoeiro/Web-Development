import mongoose from "mongoose";

async function dbConnect() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default dbConnect;
