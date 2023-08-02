import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
