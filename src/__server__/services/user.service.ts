import { User } from '../models/user.models';
import { ApiError } from '../utils/ApiError';
import bcrypt from 'bcrypt';

async function CheckExistingUser(username: string, email: string) {
  return await User.findOne({
    $or: [{ username }, { email }],
  });
}



async function CreateUser(fullname: string, username: string, email: string, password: string) {
  const role = 'user';
  const passwordEnc = await bcrypt.hash(password, 8);
  const userResponse = await User.create({
    fullname: fullname,
    username: username,
    email: email,
    password: passwordEnc,
    role: role,
    isVerified: false,
  });
  const createdUser = await User.findById(userResponse._id).select(
    '-password -refreshToken'
  );
  return createdUser;
}

const userDetails = async (userId: string) => {
  const data = await User.findById(userId).select('-password -refreshToken');
  return data;
};

const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    // const accessToken = await user.generateAccessToken();
    // const refreshToken = await user.generateRefreshToken();
    // user.refreshToken = refreshToken;
    // await user.save({ validateBeforeSave: false });
    // return { accessToken, refreshToken };
  } catch (e) {
    throw new ApiError(
      500,
      'Something went wrong while generating access and refresh tokens'
    );
  }
};

const logoutService = async (userId: string) => {
  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
};

const markVerified = async (email: string) => {
  try {
    await User.findOneAndUpdate({ email: email }, { isVerified: true });
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }

}

const isUserNotVerified = async (email: string) => {
  try {
    const user = await User.findOne({ email: email, isVerified: false });
    if (user) {
      return user;
    } else {
      return false
    }
  } catch (error) {
    console.error('Error finding user:', error);
  }
}

const saveOtpToken = async (email: string, token: string) => {
  try {
    const user = await User.findOneAndUpdate({ email: email }, { otpToken: token })
    return user.email;
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating otp 1'
    );
  }
}

export {
  CheckExistingUser,
  CreateUser,
  generateAccessAndRefreshTokens,
  userDetails,
  logoutService,
  markVerified,
  isUserNotVerified,
  saveOtpToken
};