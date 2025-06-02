import { useState } from "react";

const useModal = () => {
    const [toggle, setToggle] = useState({
        create: false,
        edit: false,
        delete: false,
    });

    const handleOpen = (type) => {
        if (type === "create") setToggle({ create: true });
        if (type === "edit") setToggle({ edit: true });
        if (type === "delete") setToggle({ delete: true });
    };

    const handleClose = (type) => {
        if (type === "create") setToggle({ create: false });
        if (type === "edit") setToggle({ edit: false });
        if (type === "delete") setToggle({ delete: false });
    };
    return { toggle, handleOpen, handleClose };
};

export default useModal;
