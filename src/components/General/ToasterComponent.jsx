import { ToastContainer } from "react-toastify";

const ToasterComponent = () => {
    return (
        <div>
            {" "}
            <ToastContainer
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
};

export default ToasterComponent;
