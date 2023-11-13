import { BsCalendar, BsCart4, BsHouse, BsShopWindow } from "react-icons/Bs";
import { MdMenu, MdReviews, MdShoppingBag } from "react-icons/Md";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 h-full">
      {/* dashboard side bar */}
      {/* <div className="drawer">
      

      {/* my creation */}
      <div className="col-span-3 min-h-screen bg-orange-300 ">
        <ul className="menu p-4 dashboardItem">
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
              <BsCart4></BsCart4> My Cart
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
