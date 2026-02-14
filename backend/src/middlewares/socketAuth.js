import jwt from "jsonwebtoken";
import cookie from "cookie";

export const socketAuth = (socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("Unauthorized"));
    }

    const cookies = cookie.parse(rawCookie);
    const jwtToken = cookies.jwtToken;

    if (!jwtToken) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Attach user context (same idea as req.user)
    socket.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};
