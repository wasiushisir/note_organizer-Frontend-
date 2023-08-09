// import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <div>
      <div className="pt-16">
        <Outlet />
      </div>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
