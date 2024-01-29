import { toast } from "react-toastify"; // Đảm bảo bạn import toast từ thư viện react-toastify

export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      break;
    case "warning":
      toast.warn(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      break;
    default:
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
  }
};
