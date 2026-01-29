import bcrypt from "bcrypt"
import { userRegisterationRepo } from "./user.reposotory.js"
import { customErrorHandler } from "../../middlewares/errorHandler.js"
import { userSignInRepo } from "./user.reposotory.js"
import jwt from "jsonwebtoken"

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




export const userSignIn = async (req, res, next) => {
  try {
    const response = await userSignInRepo(req.body)

    if (response.success) {
      const token = jwt.sign(
        { id: response.data._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )

      return res
        .cookie("jwtToken", token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: response.message,
          data:response.data
        })
    }

    // ✅ Proper error forwarding
    return next(
      new customErrorHandler(
        response.error.statusCode,
        response.error.msg
      )
    )

  } catch (error) {
    return next(
      new customErrorHandler(
        500,
        error.message || "Internal Server Error"
      )
    )
  }
}

