import validator from '../middlewares/validation.middleware';
import { registrationSchema, loginSchema } from '../validators/user.validator';
import {
  CheckExistingUser,
  CreateUser,
  generateAccessAndRefreshTokens,
  userDetails,
  logoutService,
} from '../services/user.service';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/AsyncHandler';
import httpStatus from 'http-status';

interface dataI {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

async function registerUser(data: dataI) {
  const { fullname, username, email, password } = data;
  console.log(fullname);
  const existingUser = await CheckExistingUser(username, email);
  if (existingUser) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `User with ${
        existingUser.email === email ? 'email' : 'username'
      } already exists`
    );
  } else {
    const newUser = await CreateUser(fullname, username, email, password);
    return newUser;
  }
}

async function loginUser(data: any) {

  const validation = await validator(data, loginSchema)
  if(!validation){
    throw new ApiError(httpStatus.BAD_REQUEST, 'BAD_REQUEST');
  }
  const { email, password } = data;

  const user = await CheckExistingUser('', email);
  // console.log(user);

  if (!user) {
    throw new Error( 'User does not exist');
    
  } else if (!user?.isVerified) {
    throw new Error( 'Email ID not verified');
  }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new Error( 'Invalid credentials');
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
  // logoutUser
};
