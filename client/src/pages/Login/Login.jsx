import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { SERVER_URL } from "../../utils/constants";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("user@email.com");
    const [password, setPassword] = useState("123456");
    const [err, setErr] = useState({ email: "", password: "" });
    const { authUser, setAuthUser } = useAuth();

    useEffect(() => {
        if (authUser) navigate("/dashboard");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setErr((prev) => ({
                ...prev,
                email: "Please enter a valid email.",
            }));
        }
        if (!password) {
            setErr((prev) => ({
                ...prev,
                password: "Please enter a password.",
            }));
            return;
        }
        try {
            const { data } = await axios.post(
                `${SERVER_URL}/api/v1/auth/login`,
                { email, password }
            );
            localStorage.setItem("authUser", JSON.stringify(data));
            setAuthUser(data);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <div className="min-h-screen bg-[#c3d5db] ">
            <Toaster />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden">
                <div className="bg-white p-10 rounded-xl shadow-md w-[30rem]">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                    <p className="mb-6 text-gray-600">Sign Up to Get Started</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="flex items-center border rounded-full px-4 py-2">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="outline-none w-full bg-transparent"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErr((prev) => ({
                                            ...prev,
                                            email: "",
                                        }));
                                    }}
                                />
                            </div>
                            {err?.email && (
                                <p className="text-red-500 ml-2 mt-1">
                                    {err.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center border rounded-full px-4 py-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="outline-none w-full bg-transparent"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErr((prev) => ({
                                            ...prev,
                                            password: "",
                                        }));
                                    }}
                                />
                            </div>
                            {err?.password && (
                                <p className="text-red-500 ml-2 mt-1">
                                    {err.password}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-600  text-white py-2 rounded-full hover:bg-gray-500  transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
