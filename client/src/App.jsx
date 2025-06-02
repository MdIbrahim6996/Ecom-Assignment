import AuthProvider from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "order-success",
        element: <OrderSuccess />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
]);

const App = () => {
    return (
        <AuthProvider>
            <Toaster />
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
