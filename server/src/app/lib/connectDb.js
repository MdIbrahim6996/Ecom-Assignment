const mongoose = require("mongoose");

exports.connectDatabase = () => {
    try {
        mongoose
            .connect(process.env.MONGO_URI)
            .then(() => console.log("DB CONNECTED"));
    } catch (error) {
        console.log("error connecting database.");
    }
};
