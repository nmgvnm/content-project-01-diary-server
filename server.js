require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongoose로 mongodb 연결됨"))
  .catch((err) => console.error("mongoose로 mongodb 연결 실패", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.put("/test", require("./routes/postsRouter"));

app.get("/data/list", require("./routes/getsRouter"));
app.get("/memo/:memoId", require("./routes/getsRouter"));

const date = new Date();
server.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행중입니다. 현재날짜 : ${date}, 타입 : ${typeof date}`);
});
