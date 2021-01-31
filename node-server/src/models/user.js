import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'username already existing'],
    required: [true, 'username required'],
  },
  email: {
    type: String,
    unique: [true, 'email already registered'],
    required: [true, 'email required'],
    validate: [isEmail, 'No valid email address provided'],
    // todo: custom validate:
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 42,
    select: false,
  },
  role: {
    type: String,
  },
});

userSchema.statics = {
  findByLogin: async function (login) {
    let user = await this.findOne({ username: login });
    if (!user) {
      user = await this.findOne({ email: login });
    }
    return user;
  },
};

userSchema.pre('remove', function (next) {
  this.model('Message').deleteMany({ userId: this._id }, next);
});

userSchema.pre('save', async function () {
  this.password = await this.generatePasswordHash();
});

userSchema.methods = {
  generatePasswordHash: async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  },

  validatePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

const User = mongoose.model('User', userSchema);

export default User;
