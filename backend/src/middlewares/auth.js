import jwt from "jsonwebtoken";


export const autMiddleware = (req, res, next) => {
    const { jwtToken } = req.cookies

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(401).json({ success: false, msg: "Unauthorized Access" })
        } else {
            req._id = data.id
            next()
        }
    })





}





