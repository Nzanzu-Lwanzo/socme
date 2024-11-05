import dotenv from "dotenv";
dotenv.config();
import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default function dbConnect() {
  try {
    mongoose.connect(MONGODB_URI, {
      dbName: "socme",
    });
    console.log("CONNECTED TO DATABASE -> OK");
  } catch (e) {
    console.log("CONNECTION TO DATABASE -> FAILED");
  }
}
