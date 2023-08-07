// import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="pt-16">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
