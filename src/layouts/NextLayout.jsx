import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

export default function NextLayout() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}
