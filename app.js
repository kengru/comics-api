import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cron from "node-cron";
import dotenv from "dotenv";

import mangasRoutes from "./routes/mangas";
import fetchMangas from "./jobs/fetch";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

// Routes
app.use("/mangas", mangasRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

cron.schedule("* 1 * * *", () => {
  fetchMangas();
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
