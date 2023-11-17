import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../assets/Components/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/Fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hostingAPI = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { _id, name, category, recipe, price } = useLoaderData();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // image upload to image bb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hostingAPI, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      //  image bb image url set server site api
      const menuItem = {
        name: data.name,
        category: data.Category,
        price: parseFloat(data.Price),
        recipe: data.recipe,
        image: res.data?.data?.display_url,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        // reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.name} updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subHeading="updated this item"></SectionTitle>
      <div>
        <SectionTitle
          heading="add a item"
          subHeading="Whats New"></SectionTitle>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Recipe Name*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                required
                defaultValue={name}
                placeholder="Recipe Name"
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex justify-center items-center gap-6">
              {/* category */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  defaultValue={category}
                  {...register("Category", { required: true })}
                  className="select select-bordered w-full ">
                  <option disabled defaultValue={"Select"}>
                    Select a Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="Dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              {/* price */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Price*</span>
                </label>
                <input
                  {...register("Price")}
                  type="number"
                  required
                  defaultValue={price}
                  placeholder="Price"
                  className="input input-bordered w-full "
                />
              </div>
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <textarea
                required
                {...register("recipe")}
                placeholder="Recipe Details"
                defaultValue={recipe}
                className="textarea textarea-bordered textarea-lg w-full "></textarea>
            </div>
            <div className="form-control w-full my-6">
              <input
                {...register("image")}
                required
                type="file"
                className="file-input w-full "
              />
            </div>

            <button
              type="submit"
              className="flex btn w-full bg-gradient-to-r from-[#835D23] to-[#B58130] gap-5">
              <FaUtensils></FaUtensils>
              Update Menu Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
