const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
// const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const Post = require("./models/Post");
const Conversation = require("./models/Conversation");

dotenv.config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Connected to MongoDB`);
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// const str = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "pictures");
//   },
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, Date.now() + path.extname(file.originalname) );
//   },
// });

// const upld = multer({ storage: str });

// app.post("/upld", upld.single("picture"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.post("/search/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();
  const fetchedUser = await User.findOne({ username: name });
  if (fetchedUser) res.json({ url: `http://localhost:3000/profile/${name}` });

  res.send("");
});

app.get("/getUser/:id", async (req,res)=>{
    try{
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch(err){
      res.status(500).json(err);
    }
});

app.delete("/profile/:id", async (req, res) => {
  try {
    // const user = await User.findOne({ username: req.params.username });
    await Post.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Post deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/getfriends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //we are using promise so we can use map also to fetch all data not just one
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture, birthday } = friend;
      friendList.push({ _id, username, profilePicture, birthday });
    });
    console.log(friendList);
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/updatePic/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.updateOne({ $set: { profilePicture: req.body.img } });
      res.status(200).json("Profile Picture Updated");
    } else {
      res.status(404).json("Error!!!");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/conv/:firstUserId/:secondUserId", async (req, res) => {

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if(!conversation){
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
  
});

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/users", (req, res) => {
  res.send("Welcome to user page");
});

app.listen(8800, () => {
  console.log("Server is running on 8800 port");
});

// mongodb+srv://vishal:vishal1829@cluster0.6gaun.mongodb.net/social?retryWrites=true&w=majority

// multer is a nodejs middleware for handling or uploading files

// MONGO_URL = mongodb+srv://vishal:vishal1829@cluster0.6gaun.mongodb.net/social?retryWrites=true&w=majority
