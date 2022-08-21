const { User } = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  //Incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "Email is not registered";
  }

  //Icorrect password
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  //Duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }

  //Validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Antonio Freeman Secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res, next) => {
  let checkUser = await User.findOne({ email: req.body.email });
  if (checkUser === null) {
    User.create(req.body)
      .then(async (data) => {
        const token = createToken(data._id);
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        data.nickname = Date.now() + Math.random(10);
        data.token = token;
        data.save();
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 100000 });
        res.status(201).send({ data });
      })
      .catch((err) => {
        const errors = handleErrors(err);
        res.send({ errors });
      });
  } else {
    const errors = handleErrors({ code: 11000 });
    res.send({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  try {
    const user = await User.login(req.body.loginEmail, req.body.loginPassword);
    res.cookie("jwt", user.token, { httpOnly: true, maxAge: maxAge * 100000 });
    res.status(200).send({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.send({ errors });
  }
};

module.exports.getProfile_get = async (req, res) => {
  let checkUser = await User.findOne({ nickname: req.params.id });
  if (checkUser !== null) {
    res.status(201).send({ checkUser });
  } else {
    res.send(null);
  }
};
module.exports.getProfileById_get = async (req, res) => {
  let checkUser = await User.findOne({ _id: req.params.id });
  if (checkUser !== null) {
    res.status(201).send({ checkUser });
  } else {
    res.send(null);
  }
};
module.exports.addFriend_post = async (req, res) => {
  let user = await User.findOne({ _id: req.body.id });
  let userFinded = await User.findOne({ _id: req.body.uId });
  if (user !== null && userFinded !== null) {
    if (userFinded.friendRequests.length !== 0) {
      userFinded.friendRequests.map((i) => {
        if (i.friendId === user._id.toString()) {
          const findIndexOfNotification = userFinded.notifications.findIndex(
            (i) => i.to === user.nickname
          );
          const findIndex = userFinded.friendRequests.findIndex(
            (i) => i.friendId === user._id.toString()
          );
          userFinded.friendRequests.splice(findIndex, 1);
          userFinded.notifications.splice(findIndexOfNotification, 1);
          user.friends.push({
            friendName: userFinded.name,
            friendId: userFinded._id,
            to: `/profile/${user.nickname}`,
          });
          userFinded.friends.push({
            friendName: user.name,
            friendId: user._id,
            to: `/profile/${user.nickname}`,
          });
          user.notifications.push({
            userId: "Completed",
            message: `${userFinded.name} has accepted your friend request!`,
            to: `/profile/${userFinded.nickname}`,
          });
          user.save();
          userFinded.save();
        }
      });
      res.status(201).send({ user, userFinded });
    }
  } else {
    res.send(null);
  }
};

module.exports.addFriendRequest_post = async (req, res) => {
  let user = await User.findOne({ _id: req.body.id });
  let userFinded = await User.findOne({ _id: req.body.uId });
  if (user !== null && userFinded !== null) {
    if (userFinded.friendRequests.length !== 0) {
      userFinded.friendRequests.map((i) => {
        if (i.friendId === user._id.toString()) {
          const findIndexOfNotification = userFinded.notifications.findIndex(
            (i) => i.to === user.nickname
          );
          const findIndex = userFinded.friendRequests.findIndex(
            (i) => i.friendId === user._id.toString()
          );
          userFinded.friendRequests.splice(findIndex, 1);
          userFinded.notifications.splice(findIndexOfNotification, 1);
        }
      });
      userFinded.save();
      res.status(201).send({ user, userFinded });
    } else {
      userFinded.friendRequests.push({
        friendId: user._id,
        friendName: user.name,
      });
      userFinded.notifications.push({
        userId: user._id,
        message: `${user.name} has sent you a friend request!`,
        to: `/profile/${user.nickname}`,
      });
      userFinded.save();
      res.status(201).send({ user, userFinded });
    }
  } else {
    res.send(null);
  }
};

module.exports.logout_post = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send();
};
