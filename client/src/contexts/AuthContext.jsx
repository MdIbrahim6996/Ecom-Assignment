import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("authUser"))
    );
    const [loggedIn, setLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        loggedIn,
        setLoggedIn,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
