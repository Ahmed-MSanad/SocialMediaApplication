import mongoose from "mongoose";


async function connectDb() {
  const conn = await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("db connected successfully" + conn.connection.host);
    })
    .catch((error) => {
      console.log("fail to connect to db", error.message);
    });
}

export default connectDb;