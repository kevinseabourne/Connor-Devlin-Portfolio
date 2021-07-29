import { toast } from "react-toastify";

export const errorMessage = () => {
  toast.error("an unexpected occured", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
