import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("authUser");
        const { data } = await axios.get(
            `http://localhost:4000/api/v1/auth/logout`
        );
        setAuthUser(null);
        navigate("/login");
    };
    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-sm text-lg">
            <div className="font-medium text-gray-800">Google Store</div>
            <div className="flex gap-4 items-center">
                {authUser ? (
                    <button
                        onClick={() => handleLogout()}
                        className="font-semibold hover:underline cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to={"/login"}>
                        <span className="font-semibold hover:underline">
                            Login / Register
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
