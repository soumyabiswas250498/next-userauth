import validator from '../middlewares/validation.middleware';
import { registrationSchema, loginSchema } from '../validators/user.validator';
import {
  CheckExistingUser,
  CreateUser,
  generateAccessAndRefreshTokens,
  userDetails,
  logoutService,
  isUserNotVerified,
  markVerified
} from '../services/user.service';
import { ApiError } from '../utils/ApiError';
import httpStatus from 'http-status';
import { sendActivationEmail } from '../utils/EmailSender';
import { decryptAES } from '../utils/EmailSender';
import { tokenExpiryTime, seperator } from '../utils/constants';
import { decryptClientData } from '@/src/helper/useEncryption';
import { isTokenExpired } from '@/src/helper/useEncryption';





interface dataI {
  fullname: string;
  username: string;
  email: string;
  password: string;
}
interface VerifyI {
  token: string
}

async function registerUser(data: dataI) {
  const { fullname, username, email, password } = data;
  const existingUser = await CheckExistingUser(username, email);
  if (existingUser) {
    if (!existingUser.isVerified && username === existingUser.username && email === existingUser.email) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `User is not verified yet.`
      );
    } else {
      throw new ApiError(
        httpStatus.CONFLICT,
        `User with ${existingUser.email === email ? 'email' : 'username'
        } already exists`
      );
    }
  } else {
    const newUser = await CreateUser(fullname, username, email, password);
    await sendActivationEmail(newUser.email)
    return newUser;
  }
}

async function verifyUser(email: string, otp: string) {

  try {
    const userData = await CheckExistingUser('', email)
    const [correctOtp, time] = decryptAES(userData.otpToken).split(seperator)
    const isExpired = isTokenExpired(parseInt(time), tokenExpiryTime)
    if (isExpired) {
      return 'expired'
    } else {
      if (otp === correctOtp) {
        const result = await markVerified(email);
        if (result) {
          return 'success'
        } else {
          return 'update failed'
        }

      } else {
        return 'invalid otp'
      }
    }
    // const token = userData.
    // const [otp, time] = data.split(',')
    // const currentTime = Date.now() / 1000;
    // if ((currentTime - parseInt(time)) >= tokenExpiryTime) {
    //   return 'Expired'
    // } else {
    //   const user = await CheckExistingUser('', email);
    //   if (!user) {
    //     return 'Invalid token'
    //   } else {
    //     const result = await markVerified(email);
    //     if (result) {
    //       return 'success'
    //     } else {
    //       return 'update failed'
    //     }
    //   }
    // }
  } catch (error) {
    return 'Invalid token'
  }
}

async function sendVerificationMail(token: string) {

  const data: string = decryptClientData(token);
  if (!data) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `Invalid Token`
    );
  }
  const [email, time] = data.split(seperator)

  const isExpired = isTokenExpired(parseInt(time), tokenExpiryTime);
  if (isExpired) {
    const result = await isUserNotVerified(email);
    if (result) {
      await sendActivationEmail(email)
      return 'success'
    } else {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `Invalid Token`
      );
    }
  } else {
    throw new ApiError(
      httpStatus.CONFLICT,
      `Verification link is still valid`
    );
  }
}


async function loginUser(data: any) {

  const validation = await validator(data, loginSchema)
  if (!validation) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'BAD_REQUEST');
  }
  const { email, password } = data;
  const user = await CheckExistingUser('', email);


  if (!user) {
    throw new Error('User does not exist');

  } else if (!user?.isVerified) {
    throw new Error('Email ID not verified');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  const loggedInUser = await userDetails(user._id);
  return loggedInUser;
  // console.log(loggedInUser)
}

//   return res
//     .status(200)
//     .cookie('accessToken', accessToken, options)
//     .cookie('refreshToken', refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         'User logged in successfully'
//       )
//     );
// });

// const logoutUser = asyncHandler(async (req, res) => {
//   await logoutService(req.user._id);
//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .clearCookie('accessToken', options)
//     .clearCookie('refreshToken', options)
//     .json(new ApiResponse(200, {}, 'Logged out successfully'));
// });

export {
  registerUser,
  loginUser,
  verifyUser,
  sendVerificationMail

  // logoutUser
};
