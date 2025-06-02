import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { authUser } = useAuth();

    useEffect(() => {
        if (!authUser) navigate("/login");
    }, []);

    return <>{children}</>;
};

export default ProtectedRoute;
