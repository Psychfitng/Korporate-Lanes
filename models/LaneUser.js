const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const laneUserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "Please enter your laneUser logo"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  company_name: {
    type: String,
  },
  lane_name: {
    type: Schema.Types.ObjectId,
    ref: 'lane'
  },
}, {timestamps: true});

// fire a function before doc saved to db
laneUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
laneUserSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// static method to login user
laneUserSchema.statics.login = async function (name, password) {
  const laneUser = await this.findOne({ name });
  if (laneUser) {
    const auth = await bcrypt.compare(password, laneUser.password);
    if (auth) {
      return laneUser;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const LaneUser = mongoose.model("laneUser", laneUserSchema);

module.exports = LaneUser;
