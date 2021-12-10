const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String,default: 'anonymous' },
    image: { type:String}
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 1);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  console.log(this);
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  // if(docToUpdate.password)
  // docToUpdate.save();
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
