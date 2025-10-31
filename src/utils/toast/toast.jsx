import toast from "react-hot-toast";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

export default function showToast({ type, message }) {
  return toast.custom(() => (
    <div className="bg-[#3f4143] p-4 rounded-lg flex items-center justify-center gap-2">
      {type === "success" && <FaCheckCircle />}
      {type === "error" && <FaCircleXmark />}
      {type === "warn" && <FaInfoCircle />}
      <p className="text-lg font-bold">{message}</p>
    </div>
  ));
}
