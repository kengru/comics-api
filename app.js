import express from "express";
import bodyParser from "body-parser";
import cron from "node-cron";

import feedRoutes from "./routes/feed";
import fetchMangas from "./jobs/fetch";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});
app.use("/feed", feedRoutes);

cron.schedule("* * * * *", () => {
  fetchMangas();
});

app.listen(8080);