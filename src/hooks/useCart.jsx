import { useQuery } from "@tanstack/react-query";
import Loading from "../Pages/Sheard/Loading/Loading";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useCart = () => {
  // use tanStack query
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const {
    refetch,
    isLoading,
    data: cart = [],
  } = useQuery({
    queryKey: ["cartData", user?.email],
    //     queryFn: () =>
    //       fetch("http://localhost:5000/carts").then((res) => res.json()),
    //
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    <Loading></Loading>;
  }
  return [cart, refetch];
};

export default useCart;
