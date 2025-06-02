const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            url: {
                type: String,
                required: true,
            },
            publicId: { type: String, required: true },
        },
        quantity: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = model("Product", ProductSchema);
