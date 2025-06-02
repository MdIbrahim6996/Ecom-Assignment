import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                    Thank you for ordering!
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                    Learn more about new events, promotions, and exclusive deals
                    with discount rewards emailed to you!
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                        View Order
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
