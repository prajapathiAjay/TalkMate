import bcrypt from "bcrypt"
import { userRegisterationRepo } from "./user.reposotory.js"
import { customErrorHandler } from "../../middlewares/errorHandler.js"


export const userRegisteration = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const resp = await userRegisterationRepo({
      ...req.body,
      password: hashedPassword,
    });

    if (resp.success) {
      return res.status(201).json({
        success: true,
        message: resp.message,
        data: resp.data,
      });
    }

    // business logic error (handled response)
    return next(
      new customErrorHandler(
        resp.error?.statusCode || 400,
        resp.error?.msg || "Registration failed"
      )
    );

  } catch (error) {
    // unexpected / runtime errors
    return next(
      new customErrorHandler(
        error.statusCode || 500,
        error.message || "Internal Server Error"
      )
    );
  }
};
