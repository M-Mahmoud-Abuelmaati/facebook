const { Post } = require("../models/post");

module.exports.get_posts = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

module.exports.create_post = (req, res, next) => {
  Post.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.add_comment = (req, res, next) => {
  Post.findById({ _id: req.params.id }, req.body)
    .then(() => {
      Post.findOne({ _id: req.params.id }).then((data) => {
        data.comments.push({
          text: req.body.text,
          commentCreatedByName: req.body.commentCreatedByName,
          commentCreatedById: req.body.commentCreatedById,
        });
        data.save();
        res.send(data);
      });
    })
    .catch(next);
};

module.exports.add_reply = (req, res, next) => {
  Post.findById({ _id: req.params.id })
    .then((data) => {
      data.comments.map((comment) => {
        if (comment._id.toString() === req.body.cId) {
          comment.replies.push({
            text: req.body.text,
            replyCreatedByName: req.body.replyCreatedByName,
            replyCreatedById: req.body.replyCreatedById,
          });
          res.send(comment);
        }
        return comment;
      });
      data.save();
    })
    .catch(next);
};

module.exports.add_post_like = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((data) => {
      let index = data.reacts.findIndex(
        (react) => react.createdByUserId === req.body.createdByUserId
      );
      data.reacts.filter((react) => {
        if (react.createdByUserId === req.body.createdByUserId) {
          data.reacts.splice(index, 1);
          return;
        }
      });
      data.reacts.push(req.body);
      data.save();
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

// console.log(req.params.id) // Post ID
// console.log(req.body.replyId) // Reply ID
// console.log(req.body.commentId) // Comment ID
module.exports.add_comment_like = (req, res) => {
  Post.updateOne(
    { "comments._id": req.body.commentId },
    {
      $set: {
        "comments.$[commentId].like": req.body.like,
      },
    },
    {
      arrayFilters: [{ "commentId._id": req.body.commentId }],
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// console.log(req.params.id) // Post ID
// console.log(req.body.replyId) // Reply ID
// console.log(req.body.commentId) // Comment ID
module.exports.add_reply_like = (req, res) => {
  Post.updateOne(
    { "comments.replies._id": req.body.replyId },
    {
      $set: {
        "comments.$[commentId].replies.$[replyId].like": req.body.like,
      },
    },
    {
      arrayFilters: [
        { "commentId._id": req.body.commentId },
        { "replyId._id": req.body.replyId },
      ],
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.delete_post = (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id }).then((response) => {
    res.send(response);
  });
};
