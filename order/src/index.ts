import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./utils/data-source";
import http from "http";
import api from "./routes";

dotenv.config();
const app = express();
const server = http.createServer(app);
AppDataSource.initialize().then(() => {
  console.log("Connect database success");
});
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("", api);

server.listen(8083, () => {
  console.log("[ORDER SERVICE] is running on port 8083");
});
