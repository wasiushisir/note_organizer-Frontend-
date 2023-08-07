import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Home from "../pages/Home";
import Signup from "../pages/Signup";

import Login from "../pages/Login";
import Home from "../pages/Home";
import AddNewNote from "../pages/AddNewNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/addNote",
        element: <AddNewNote />,
      },
    ],
  },
]);

export default router;
