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
const admin = require("firebase-admin");
const serviceAccount = require("./service_account_key.json");
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const connectDB = require("./config/db");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();
// CORS 설정
app.use(
  cors({
    origin: process.env.CORS_SETTING, // React 앱이 실행 중인 도메인
    credentials: true,
  })
);

// mongoose
connectDB();

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

const authRoutes = require("./routes/authRoutes"); // 유저 관련
const postRoutes = require("./routes/postRoutes"); // 게시물 관련

// GET
app.get("/memo/:memoId", require("./routes/getsRouter"));

// PUT
app.put("/data/update", require("./routes/putsRouter"));


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

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
