const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/db")


function genToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRESIN
  });
  return token;
}


// function authToken(token) {
//   try {
//     return jwt.verify(token, jwtConfig.jwt_key);
//   } catch (error) {
//     console.log(error);
//     return { error: "internal server error" };
//   }
// }

module.exports = {
  genToken,
  //authToken,
};
