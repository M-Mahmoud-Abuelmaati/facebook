const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //Check json web token exists & is verifed
  if (token) {
    jwt.verify(token, "Antonio Freeman Secret", async (err, decodedToken) => {
      if (err) {
        res.send(err.message)
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.send(user)
        next(); //Works now!
      }
    });
  } else {
    res.send("No token available")
    next();
  }
};

module.exports = { checkAuth };
