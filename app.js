import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import mangasRoutes from "./routes/mangas";
import usersRoutes from "./routes/users";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/mangas", mangasRoutes);
app.use("/users", usersRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
// end

mongoose
  .connect(process.env.DB_URI)
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => console.log(err));
