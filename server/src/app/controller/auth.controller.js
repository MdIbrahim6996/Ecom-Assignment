const { generateToken } = require("../utils/generateToken");
const User = require("../model/user.model");

exports.register = async (req, res, next) => {
    const { email } = req?.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            throw new Error("User already exists. Try another email!");
        }
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist. Register First!");
        }

        if (user && (await user.isPasswordMatched(password))) {
            const responseUser = user?._doc;
            let token = generateToken(user?._id);
            res.cookie("authToken", token);

            return res.json({
                ...responseUser,
                token,
            });
        }
        res.status(401);
        throw new Error("Invalid Login Credentials");
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("authToken");
        res.send({ message: "logout Success" });
    } catch (error) {}
};
