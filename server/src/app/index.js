require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { connectDatabase } = require("./lib/connectDb");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const productRouter = require("./router/product.router");
const authRouter = require("./router/auth.router");
const paymentRouter = require("./router/payment.route");

const app = express();

connectDatabase();
app.use(cors());
app.use(morgan("dev"));
app.get("/hello", (req, res) => {
    res.send("hello");
});
app.use(express.json({ limit: "5mb" }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/payment", paymentRouter);
console.log(path.join(path.resolve(), "client/dist"));

if (process.env.NODE_ENV === "production") {
    // Serve front-end app for all unmatched routes
    app.use(express.static(path.join(path.resolve(), "client", "dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(
            path.resolve(path.resolve(), "client", "dist", "index.html")
        );
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Listening at PORT", PORT));
