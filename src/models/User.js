const mongoose = require("mongoose");

const ROLE = ["admin", "customer"];

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ROLE,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

const UserModel = mongoose.model("User", UserSchema);

const getUsers = () => UserModel.find();

const getUserByUsername = (username) =>
  UserModel.findOne({ username })

const getUserByEmail = (email) =>
  UserModel.findOne({ email });

const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

const getUserById = (id) =>
  UserModel.findById(id);

const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());

const deleteUserById = (id) =>
  UserModel.findOneAndDelete({ _id: id });

const updateUserById = (id, values) =>
  UserModel.findOneAndUpdate(id, values);

module.exports = {
  getUsers,
  getUserByUsername,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
