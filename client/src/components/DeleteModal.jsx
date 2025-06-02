import React from "react";
import Modal from "./Modal";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { SERVER_URL } from "../utils/constants";

const DeleteModal = ({ close, id, fetch }) => {
    const { authUser } = useAuth();
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(
                `${SERVER_URL}/api/v1/product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authUser?.token}`,
                    },
                }
            );
            fetch();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal close={close}>
            <div className="bg-red-500 text-white p-2">DELETE PRODUCT</div>
            <div className="font-semibold text-xl text-center my-10">
                Are you sure you want to delete this product ?
            </div>
            <div className="w-fit mx-auto flex items-center gap-2 mb-5 font-semibold">
                <button
                    onClick={close}
                    className="px-6 py-2 rounded-md bg-gray-300 text-sm"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        handleDelete();
                        close();
                    }}
                    className="px-6 py-2 rounded-md bg-red-500 text-sm text-white"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
