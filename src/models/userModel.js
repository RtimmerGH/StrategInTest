const mongoose = require("mongoose");
const validator = require("validator");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error("email non valide!");
    },
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 4, max: 20 }))
        throw new Error("mdp entre 4 et 20 caractères");
    },
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const { JWT_SECRET } = process.env;
  const authToken = jwt.sign({ _id: this._id.toString() }, JWT_SECRET, {
    expiresIn: "24h",
  });
  return authToken;
};

userSchema.statics.findUser = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });
  if (!user) throw new Error("Erreur, connexion impossible!");
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) throw new Error("Erreur, connexion impossible!");
  return user;
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      memory: 15360,
      iterations: 2,
      parallelism: 1,
    });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
