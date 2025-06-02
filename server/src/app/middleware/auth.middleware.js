const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.authMiddleware = async (req, res, next) => {
    let token;
    if (req?.headers?.authorization) {
        if (req?.headers?.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                if (token) {
                    const decoded = jwt.verify(token, process.env.SECRET);
                    const user = await User.findById(decoded?.id).select(
                        "-password"
                    );

                    req.user = user;
                } else {
                    throw new Error("There is no token attached to the header");
                }
                next();
            } catch (error) {
                console.log(error);
                next(error);
            }
        } else {
            next(new Error("Invalid token attached to the header"));
        }
    } else {
        next(new Error("Invalid or no token attached to the header"));
    }
};
