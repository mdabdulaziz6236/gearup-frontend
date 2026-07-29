import jwt from "jsonwebtoken";

const verifyToken = async (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
