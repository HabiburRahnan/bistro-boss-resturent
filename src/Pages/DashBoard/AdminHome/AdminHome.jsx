import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaFirstOrder,
  FaMenorah,
  FaSackDollar,
  FaUsers,
} from "react-icons/fa6";

const AdminHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-3xl">
        <span>
          Hi, Welcome {user?.displayName ? user?.displayName : "Back"}
        </span>
      </h2>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-orange-500">
            <FaSackDollar className="text-2xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats?.totalRevenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-orange-500">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.user}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-orange-500">
            <FaMenorah className="text-3xl" />
          </div>
          <div className="stat-title">Total Menu Items</div>
          <div className="stat-value">{stats?.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-orange-500">
            <FaFirstOrder className="text-3xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats?.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
