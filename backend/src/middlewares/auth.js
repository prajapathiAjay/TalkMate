// import jwt from "jsonwebtoken";


// export const autMiddleware = (req, res, next) => {
//     const { jwtToken } = req.cookies

//     jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
//         if (err) {
//             return res.status(401).json({ success: false, msg: "Unauthorized Access" })
//         } else {
//             req._id = data.id
//             next()
//         }
//     })





// }

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;

    if (!jwtToken) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized Access",
      });
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Attach user context
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Invalid or Expired Token",
    });
  }
};




