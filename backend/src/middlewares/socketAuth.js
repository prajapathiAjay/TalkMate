// // import jwt from "jsonwebtoken";
// // import cookie from "cookie";

// // export const socketAuth = (socket, next) => {
// //   try {
// //     const rawCookie = socket.handshake.headers.cookie;
// // console.log("Handshake headers:", socket.handshake.headers);
// //     if (!rawCookie) {
// //       return next(new Error("Unauthorized"));
// //     }

// //     const cookies = cookie.parse(rawCookie);
// //     const jwtToken = cookies.jwtToken;

// //     if (!jwtToken) {
// //       return next(new Error("Unauthorized"));
// //     }

// //     const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

// //     // Attach user context (same idea as req.user)
// //     socket.user = {
// //       id: decoded.id,
// //     };

// //     next();
// //   } catch (err) {
// //     console.log("JWT ERROR:", err.message);
// //     next(new Error("Invalid or expired token"));
// //   }
// // };
// export const socketAuth = (socket, next) => {
//   try {
//     console.log("Handshake headers:", socket.handshake.headers);

//     const rawCookie = socket.handshake.headers.cookie;

//     if (!rawCookie) {
//       console.log("❌ No rawCookie");
//       return next(new Error("Unauthorized"));
//     }

//     const cookies = cookie.parse(rawCookie);
//     const jwtToken = cookies.jwtToken;

//     if (!jwtToken) {
//       console.log("❌ No jwtToken in cookie");
//       return next(new Error("Unauthorized"));
//     }

//     console.log("JWT TOKEN:", jwtToken);

//     console.log("JWT_SECRET:", process.env.JWT_SECRET);

//     const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

//     console.log("✅ Token verified:", decoded);

//     socket.user = {
//       id: decoded.id,
//     };

//     next();
//   } catch (err) {
//     console.log("🔥 JWT VERIFY ERROR:", err.message);
//     next(new Error("Invalid or expired token"));
//   }
// };

import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export const socketAuth = (socket, next) => {
  try {
    // console.log("Handshake headers:", socket.handshake.headers);

    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      console.log("❌ No rawCookie");
      return next(new Error("Unauthorized"));
    }

    const cookies = cookie.parse(rawCookie);
    const jwtToken = cookies.jwtToken;

    if (!jwtToken) {
      console.log("❌ No jwtToken in cookie");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // console.log("✅ Token verified:", decoded);

    socket.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    console.log("🔥 JWT VERIFY ERROR:", err.message);
    next(new Error("Invalid or expired token"));
  }
};