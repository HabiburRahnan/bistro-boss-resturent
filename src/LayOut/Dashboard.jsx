import { BsCalendar, BsCart4, BsHouse, BsShopWindow } from "react-icons/Bs";
import { MdEmail, MdMenu, MdReviews, MdShoppingBag } from "react-icons/Md";
import { FaUtensils, FaList, FaUsers, FaBook } from "react-icons/Fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();


  const [isAdmin] = useAdmin();
  return (
    <div className="grid grid-cols-12 h-full">
      {/* dashboard side bar */}

      {/* my creation */}
      <div className="col-span-3 min-h-screen bg-orange-300 ">
        <ul className="menu p-4 dashboardItem">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <BsHouse></BsHouse> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList> Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaBook></FaBook>Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers></FaUsers>All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <BsHouse></BsHouse> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <BsCalendar></BsCalendar> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <BsCart4></BsCart4> My Cart ({cart.length})
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/reviews">
                  <MdReviews></MdReviews>Add A Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBookings">
                  <BsShopWindow></BsShopWindow>My Bookings
                </NavLink>
              </li>
            </>
          )}

          {/* shard links  */}
          <div className="divider"></div>
          <li>
            <Link to="/">
              <BsHouse></BsHouse>Home
            </Link>
          </li>
          <li>
            <NavLink to="/menu">
              <MdMenu></MdMenu> Our Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <MdShoppingBag></MdShoppingBag> Our Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/Contact">
              <MdEmail></MdEmail> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/*dashboard content  */}
      <div className="col-span-9 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
