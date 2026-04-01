import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showToast = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast.info(msg),
    warning: (msg) => toast.warning(msg),
};


export default function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
        />
    );
}