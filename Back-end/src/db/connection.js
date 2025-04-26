import mongoose from "mongoose";


async function connectDb() {
    await mongoose.connect(process.env.DB_URL)
    .then((conn) => {
      console.log("db connected successfully: " + conn.connection.host);
    })
    .catch((error) => {
      console.log("fail to connect to db", error.message);
    });
}

export default connectDb;
