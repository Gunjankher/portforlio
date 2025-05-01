import mongoose from "mongoose";

export const dbConnection = () => {

  console.log(process.env.MONGO_URI);  // Add this line before mongoose.connect()
  mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_PERSONAL_PORTFOLIO",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
