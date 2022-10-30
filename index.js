const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const path = require("path");

const app = express()
dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors())
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
  
app.use("/api/auth", authRouter )
app.use("/api/users", usersRouter )
app.use("/api/posts", postRouter )
app.use("/api/categories", categoryRouter )

mongoose.connect(process.env.MONGO_URL)
.then(console.log('DB connection successfully connected'))
.catch((err) => console.log(err))

app.listen(5000, () => {
    console.log('server started on port 8080')
})




