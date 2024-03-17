
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isVerified: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ['admin', 'author', 'editor', 'user'],
    },
    marked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'mcq',
      },
    ],
    attempted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'mcq',
      },
    ],
    refreshToken: {
      type: String,

    },
    otpToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 8);
//   } else {
//     return;
//   }
//   next();
// });

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     { _id: this._id, role: this.role, email: this.email },
//     process.env.ACCESS_TOKEN_SECRET as string,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = async function () {
//   return jwt.sign(
//     { _id: this._id, role: this.role, email: this.email },
//     process.env.REFRESH_TOKEN_SECRET as string,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

export const User = mongoose.models.User || mongoose.model('User', userSchema);
