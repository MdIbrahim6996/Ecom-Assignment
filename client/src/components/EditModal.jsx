import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { SERVER_URL } from "../utils/constants";

const EditModal = ({ close, fetch, product }) => {
    const [name, setName] = useState(product?.name);
    const [price, setPrice] = useState(product?.price);
    const [quantity, setQuantity] = useState(product?.quantity);
    const [description, setDescription] = useState(product?.description);
    const [image, setImage] = useState("");
    const { authUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${SERVER_URL}/api/v1/product/${product?._id}`,
                { name, price, quantity, description, image },
                {
                    headers: {
                        Authorization: `Bearer ${authUser?.token}`,
                    },
                }
            );
            fetch();
            close();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = async (e) => {
        // setErr("");
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file.size > 10000000) {
            setErr("Image size should be less than 10mb");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };
    return (
        <Modal>
            <div className="bg-blue-500 text-white p-2">EDIT PRODUCT</div>

            <form onSubmit={handleSubmit} class="w-full p-5 space-y-2">
                <div>
                    <label htmlFor="name" className="mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-300 outline-none rounded-md py-1 px-3 font-normal text-slate-800"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="mb-1">
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-slate-300 outline-none rounded-md py-1 px-3 font-normal text-slate-800"
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="mb-1">
                        Quantity
                    </label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border border-slate-300 outline-none rounded-md py-1 px-3 font-normal text-slate-800"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="mb-1">
                        Description
                    </label>
                    <textarea
                        rows={10}
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-slate-300 outline-none rounded-md py-1 px-3 font-normal text-slate-800"
                    />
                </div>
                  <div>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-blue-300 w-fit cursor-pointer rounded-md p-2"
                    />
                </div>

                <div className="w-fit ml-auto flex items-center gap-2 mb- font-semibold">
                    <button
                        onClick={close}
                        className="px-6 py-2 rounded-md bg-gray-300 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-md bg-blue-500 text-sm text-white"
                    >
                        Update
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditModal;
