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
const multer = require("multer");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const serviceAccount = require("./service_account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "content-project-01-diary.appspot.com",
});

const bucket = admin.storage().bucket();

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

// POST
app.post("/todo/new", require("./routes/postsRouter"));
app.post("/data/save", require("./routes/postsRouter"));

// GET
app.get("/data/list", require("./routes/getsRouter"));
app.get("/memo/:memoId", require("./routes/getsRouter"));

// PUT
app.put("/data/update", require("./routes/putsRouter"));

// DELETE

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행중입니다.`);
});

// test
app.get("/storage/test", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();

    const fileList = await Promise.all(
      files.map(async (file) => {
        const [metadata] = await file.getMetadata();
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: "03-03-2500",
        });

        return {
          imgName: file.name,
          timeCreated: metadata.timeCreated,
          downloadUrl: url,
        };
      })
    );

    // null 값을 필터링하여 실제 파일만 반환
    res.status(200).json(fileList);
  } catch (error) {
    console.error("Error getting file list:", error);
    res.status(500).send("Error getting file list");
  }
});
