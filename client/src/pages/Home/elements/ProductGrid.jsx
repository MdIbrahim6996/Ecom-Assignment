import axios from "axios";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../../utils/constants";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const { authUser } = useAuth();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${SERVER_URL}/api/v1/product`);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const makePayment = async (productData) => {
        if (authUser === null) {
            toast.error("To place an order login first.");
            return;
        }
        try {
            const stripe = await loadStripe(STRIPE_KEY);

            const { data } = await axios.post(
                `${SERVER_URL}/api/v1/payment`,
                { data: [productData] },
                {
                    headers: {
                        Authorization: `Bearer ${authUser?.token}`,
                    },
                }
            );
            const result = stripe.redirectToCheckout({ sessionId: data?.id });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="py-16 px-10 bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center md:text-left">
                New on the Google Store.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10 place-items-center">
                {products?.map((product) => (
                    <div key={product._id} className="">
                        <img
                            src={product.image?.url}
                            alt={product.name}
                            className="h-64 mx-auto mb-4 bg-gray-100 rounded-md"
                        />
                        <div className="px-3">
                            <h3 className="font-medium text-lg text-gray-800">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm text-justify">
                                {product?.description}
                            </p>
                            <p className="text-gray-800 font-medium mt-2 text-sm">
                                ${product.price}
                            </p>
                            <button
                                onClick={() => makePayment(product)}
                                className="bg-[#c3d5db] mt-2 w-full py-2 rounded-md cursor-pointer"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
