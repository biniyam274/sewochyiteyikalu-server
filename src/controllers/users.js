const User = require("../models/users");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ });
    if (users) {
      return res.status(200).send(users);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find users. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.getUser = async (req, res) => {
  try {
    const exists = await User.findOne({ _id: req.query.id });
    if (exists) {
      return res.status(200).send(exists);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find your profile. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.putUser = async (req, res) => {
  try {
    const auth = req.userData
    const user = await User.findOne({email: auth.email})
    if (user) {
      User.findOneAndUpdate({_id:auth._id}, req.body, (error, response) => {
        console.log({error,response})
        if (error) return res.send(error);
        return res.send(response);
      });
    } else {
      return  res.status(404).send({
        error: {
          message: "Could not find your profile. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const auth = req.userData
     User.findOneAndDelete({_id: auth._id},(error,user)=>{
       if(error) {
        return  res.status(404).send({
          error: {
            message: "Could not find your profile. Try again later.",
          },
        });
       }
       return  res.status(200).send({
         message: "success",
         user
      });

     })
    
  } catch (e) {
    return res.status(404).send(e);
  }
};

