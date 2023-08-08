import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");

    // Sign-out successful.
  };

  return (
    <div className="navbar bg-base-300 md:px-4 px-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <a>Item 1</a>
            </li>

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/home">
          <a className="btn btn-ghost normal-case text-xl hover:bg-warning">
            daisyUI
          </a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 text-black">
          <li>
            <a className="text-[18px] hover:bg-warning">Item 1</a>
          </li>

          <li>
            <a className="text-[18px] hover:bg-warning">Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!token ? (
          <Link to="/">
            <button className="btn btn-warning">login</button>
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn btn-warning">
            logout
          </button>
        )}
      </div>
    </div>
  );
}
