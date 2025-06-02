const { cloudinaryUploadImg } = require("../lib/cloudinary");
const Product = require("../model/product.model");
const { createProductSchema } = require("../utils/schemaValidation");

exports.createProduct = async (req, res, next) => {
    try {
        let imageResponse = null;
        if (req.body.image) {
            imageResponse = await cloudinaryUploadImg(
                req.body.image,
                req.body.name
            );
        }
        const product = new Product({ ...req.body, image: imageResponse });
        await product.save();
        res.send(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort("-createdAt");
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getSingleProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found.");
        }
        res.send(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    let data;
    try {
        let imageResponse = null;
        if (req.body.image) {
            imageResponse = await cloudinaryUploadImg(
                req.body.image,
                req.body.name
            );
            data = { ...req.body, image: imageResponse };
        } else {
            data = { ...req.body };
            delete data["image"];
        }

        const product = await Product.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!product) {
            throw new Error("Product not found.");
        }
        res.send(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error("Product not found.");
        }
        res.send(product);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
