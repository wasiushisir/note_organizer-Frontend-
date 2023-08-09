import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function NextLayout() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}
