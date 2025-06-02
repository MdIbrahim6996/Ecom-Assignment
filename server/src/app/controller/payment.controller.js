const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.CLIENT_URL;

exports.createPayment = async (req, res, next) => {
    const { data: products } = req.body;
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.image.url],
            },
            unit_amount: product.price * 100,
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${CLIENT_URL}/order-success`,
        cancel_url: `${CLIENT_URL}/order-cancel`,
    });
    res.send({ id: session.id });
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
