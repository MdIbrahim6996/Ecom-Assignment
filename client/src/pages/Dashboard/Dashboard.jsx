import axios from "axios";
import { useState, useEffect } from "react";
import DeleteModal from "../../components/DeleteModal";
import CreateModal from "../../components/CreateModal";
import useModal from "../../hooks/useModal";
import EditModal from "../../components/EditModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [id, setId] = useState("");
    const { toggle, handleOpen, handleClose } = useModal();
    const { authUser, setAuthUser } = useAuth();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:4000/api/v1/product"
            );
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("authUser");
        const { data } = await axios.get(
            `http://localhost:4000/api/v1/auth/logout`
        );
        setAuthUser(null);
        navigate("/login");
    };

    return (
        <>
            <div className="max-w-6xl mx-auto">
                <div class="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                    <div>
                        <h3 class="text-lg font-bold text-slate-800">
                            Manage your Product
                        </h3>
                        <p class="text-slate-500">Overview of the Products.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleOpen("create")}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                            Add Product
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleLogout()}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div class=" flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table class="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">
                                        Image
                                    </p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">
                                        Name
                                    </p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">
                                        Price
                                    </p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">
                                        Quantity
                                    </p>
                                </th>
                                {/* <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">
                                        Description
                                    </p>
                                </th> */}
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">
                                        Actions
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => (
                                <tr
                                    key={product?._id}
                                    class="hover:bg-slate-50 border-b border-slate-200"
                                >
                                    <td class="p-4 py-5">
                                        <img
                                            src={product?.image?.url}
                                            alt={product?.image?.publicId}
                                            className="h-20 w-20 rounded-md object-cover"
                                        />
                                    </td>
                                    <td class="p-4 py-5">
                                        <p class="block font-semibold text-sm text-slate-800 capitalize">
                                            {product?.name}
                                        </p>
                                    </td>
                                    <td class="p-4 py-5">
                                        <p class="block text-sm text-slate-800">
                                            ${product?.price}
                                        </p>
                                    </td>
                                    <td class="p-4 py-5">
                                        <p class="block text-sm text-slate-800">
                                            {product?.quantity}
                                        </p>
                                    </td>

                                    {/* <td class="p-4 py-5 break-words">
                                        <p class="block text-sm text-slate-800">
                                            {product?.description}
                                        </p>
                                    </td> */}
                                    <td class="p-4 py-5">
                                        <div class="space-x-1">
                                            <button
                                                onClick={() => {
                                                    handleOpen("edit");
                                                    setProduct(product);
                                                }}
                                                className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                                            >
                                                EDIT
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleOpen("delete");
                                                    setId(product?._id);
                                                }}
                                                className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {toggle.create && (
                <CreateModal
                    close={() => handleClose("create")}
                    fetch={() => fetchProducts()}
                />
            )}
            {toggle.edit && (
                <EditModal
                    product={product}
                    close={() => handleClose("edit")}
                    fetch={() => fetchProducts()}
                />
            )}
            {toggle.delete && (
                <DeleteModal
                    id={id}
                    close={() => handleClose("delete")}
                    fetch={() => fetchProducts()}
                />
            )}
        </>
    );
};

export default Dashboard;
