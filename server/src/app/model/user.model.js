const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            min: 3,
            trim: true,
            required: [true, "Full name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password should be at least 6 characters."],
        },
    },
    {
        timestamps: true,
    }
);

//!HASH PASSWORD
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//!MATCH PASSWORD
UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("User", UserSchema);
