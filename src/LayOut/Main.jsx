import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Sheard/Footer/Footer";
import Navbar from "../Pages/Sheard/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noNavbarFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {noNavbarFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noNavbarFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
