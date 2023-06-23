import { Request, Response } from 'express';
import { AuthLoginRes } from '../../../interfaces/auth/login';
import { signToken } from '../../../middlewares/auth';

export const login = async (req: Request, res: Response<AuthLoginRes>) => {
  try {
    // perform login logic here
    const token = signToken({ userId: 123 }); // sign token with user ID

    res.status(200).json({
      message: 'Successfully logged in',
      data: {},
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      data: {},
      token: '',
    });
  }
};