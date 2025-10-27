import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const SECRET_KEY = process.env.SECRET_KEY;

const checkJWT = asyncHandler(async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!!token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "token_not_valid"
                });
            };
            req.decoded = decoded;
            const expiresIn = 24 *60 * 60;
            const newToken = jwt.sign(
                {
                    user: decoded.user,
                },
                SECRET_KEY,
                {
                    expiresIn: expiresIn,
                }
            );

            res.header("Authorization", "Bearer " + newToken);
            next();
        })
    }
    return res.status(401).json({
        message: "token_required",
    })
});

export default checkJWT;