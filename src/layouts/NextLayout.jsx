import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function NextLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}
