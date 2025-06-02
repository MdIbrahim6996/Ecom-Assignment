const Modal = ({ close, children }) => {
    return (
        <div className="absolute w-full h-screen bg-black/50 top-0 left-0">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="bg-white rounded-lg border border-gray-500 w-xl overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
