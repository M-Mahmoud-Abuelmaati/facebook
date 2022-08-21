const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  type: { type: String},
  createdByUserId: { type: String},
  createdByUserName: { type: String},
});

const ReplySchema = new Schema({
  text: { type: String, default: "" },
  like: { type: String, default: "None" },
  replyCreatedByName: {
    type: String,
  },
  replyCreatedById: {
    type: String,
  },
});

const CommentSchema = new Schema({
  text: { type: String, default: "" },
  like: { type: String, default: "None" },
  commentCreatedByName: {
    type: String,
  },
  commentCreatedById: {
    type: String,
  },
  replies: [ReplySchema],
});

const PostSchema = new Schema({
  text: {
    type: String,
  },
  postCreatedByName: {
    type: String,
  },
  postCreatedById:{
    type: String,
  },
  reacts: [likeSchema],
  comments: [CommentSchema],
});

const Post = mongoose.model("post", PostSchema);

module.exports = { Post };
