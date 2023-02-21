const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your organization name'],
        unique: true,
      },
    role: {
      type: String,
      default: "Company"
    },
    user_name: {
        type: String,
        required: [true, 'Please enter your organization code'],
        unique: true,
      },
    organization_logo: {
        type: String,
        required: [true, 'Please enter your organization logo'],
      },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
     },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    lane_link: String,
    lane: {
      type: Schema.Types.ObjectId,
      ref: 'Lane'
    },
    subscriptionPackage: String,
    start_date: Date,
    end_date: Date,
    staff_list: [],
}, {timestamps: true});

organizationSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


// fire a function before doc saved to db
organizationSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

organizationSchema.pre('findByIdAndUpdate', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
organizationSchema.statics.login = async function(email, password) {
  const organization = await this.findOne({ email });
  if (organization) {
    const auth = await bcrypt.compare(password, organization.password);
    if (auth) {
      return organization;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const Organization = mongoose.model('organization', organizationSchema);

module.exports = Organization;