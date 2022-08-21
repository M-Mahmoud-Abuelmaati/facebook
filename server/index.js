const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { User } = require("./models/user");
const path = require("path");

const dir = path.join(__dirname, "public");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.mimetype.split("/").reverse()[0]
    );
  },
});

const upload = multer({ storage: storage });

const app = express();

mongoose
  .connect(
    // "mongodb+srv://2ntonio:12An555ton998io@cluster0.cngm1t5.mongodb.net/?retryWrites=true&w=majority"
    "mongodb://localhost:27017/myAppTest"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization, X-Requested-With, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "agreementrequired");
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(dir));

app.post("/uploadImage/:id", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.send({
      success: false,
    });
  } else {
    const path = require("path");
    const realPath = path.extname(`${req.file.originalname}`);
    User.findById({ _id: req.params.id }).then((data) => {
      data.img = `uploads/${req.file.filename}`;
      data.save();
      res.send(data);
    });
  }
});
app.post("/uploadCoverImage/:id", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.send({
      success: false,
    });
  } else {
    const path = require("path");
    const realPath = path.extname(`${req.file.originalname}`);
    User.findById({ _id: req.params.id }).then((data) => {
      data.coverImg = `uploads/${req.file.filename}`;
      data.save();
      res.send(data);
    });
  }
});

app.get("/public/uploads/:id", (req, res) => {
  let file = req.params.id;
  let fileLocation = path.join(__dirname + `/public/uploads/${file}`);
  res.sendFile(`${fileLocation}`);
});

app.get("/public/post/:id", (req, res) => {
  User.findById({ _id: req.params.id })
    .then((data) => {
      let file = data.img;
      let fileLocation = path.join(__dirname + `/public/${file}`);
      res.sendFile(`${fileLocation}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/posts", require("./routes/postRouter"));
app.use("/user", require("./routes/userRouter"));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});
