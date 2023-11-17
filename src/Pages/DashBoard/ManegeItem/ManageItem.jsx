import { FaEdit, FaTrashAlt } from "react-icons/Fa";
import useMenu from "../../../Hooks/UseMenu";
import SectionTitle from "../../../assets/Components/SectionTitle";
import Loading from "../../Sheard/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItem = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <Loading></Loading>;
  }

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item.name} Deleted to the menu`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <SectionTitle heading="Manage Items" subHeading="Hurry Up"></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {menu?.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>$ {item.price}</td>

                    <td>
                      <Link to={`/dashboard/updateItem/${item._id}`}>
                        <button className="btn text-xl btn-circle btn-outline bg-orange-500 text-white">
                          <FaEdit></FaEdit>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn  btn-circle btn-outline bg-red-600 text-white">
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItem;
