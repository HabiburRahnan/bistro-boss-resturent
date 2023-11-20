import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isLoading: isLoadingAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      console.log(user);
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isLoadingAdmin];
};

export default useAdmin;
