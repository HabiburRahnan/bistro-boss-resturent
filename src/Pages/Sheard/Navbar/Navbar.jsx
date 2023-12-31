import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { BsCart4 } from "react-icons/Bs";
import useCart from "../../../hooks/useCart";
import Loading from "../Loading/Loading";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  if (loading) {
    <Loading></Loading>;
  }

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashboard/userHome">Dashboard</Link>
        </li>
      )}
      <li>
        <Link to="/dashboard/cart">
          <button className="btn btn-sm ">
            <BsCart4 className="mr-2  "></BsCart4>
            <div className="badge badge-secondary">+{cart?.length}</div>
          </button>
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow fixed z-10 bg-opacity-30 bg-black text-white rounded-box w-52">
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <h className="flex justify-center items-center">
              {user?.displayName}
            </h>
            <div className="w-10 rounded-full mx-2">
              <img
                className={`rounded-full w-12 `}
                src={user?.photoURL}
                alt=""
              />
            </div>
            <button onClick={handleLogOut} className="btn btn-ghost">
              Log Out
            </button>
          </>
        ) : (
          <button className="btn ">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
