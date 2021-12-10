const jwt = require("jsonwebtoken");
const User = require("../models/users");
function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

exports.signup = async (req, res) => {
  console.log(req.body)
  const { email, password ,username} = req.body;

  if (!email || !password )   {
    return res.status(401).send({message:"Some fileds are missing!"});
    
  }
  
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(401).send({message:"User Already Exis!"});
  }
  const user = new User(req.body);
  user.save();
  const token = generateAccessToken(user.toJSON());
  return res.status(200).send({ message: "success", token: token, user:user.toJSON() });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({
      message: "Email and password can not be empty!",
    });
  } else {
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).send({
        message: "User not found. Authentication failed.",
      });
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).send({
        message: "Password not correct. Authentication failed.",
      });
    }
    const token = generateAccessToken(user.toJSON());
    return res.status(200).send({ message: "success", token: token, user:user.toJSON() });
  }
};
