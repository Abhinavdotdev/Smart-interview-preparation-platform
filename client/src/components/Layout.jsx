import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";

const Layout = () => {
  return (
    <>
      <main className="p-0 bg-indigo-900"> 
      <Navbar />
       {/* <Home /> */}
        <Outlet />
       </main>
    </>
  );
};

export default Layout;
