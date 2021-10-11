import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// creating the express object
const app = express();
dotenv.config();

// Note: app.use() is not middleware. Middleware is the function passed into app.use()

// limiting the upload file size to 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// enabling all CORS requests
app.use(cors());

// used for when the routes and functions seperated
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// https://www.mongodb.com/cloud/atlas
// hosting out databse on their cloud

const PORT = process.env.PORT || 5000;

// establishing connection with mongodb
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  ) // bind and listen the connections on the specified host and port
  .catch((error) => console.log(error.message)); // trigger if there is occus any error in making the connection

// to avoid deprecation warnings
mongoose.set("useFindAndModify", false);
