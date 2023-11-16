import { FaUtensils } from "react-icons/Fa";
import SectionTitle from "../../../assets/Components/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hostingAPI = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imagebb and then get an url
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
        image: res.data.display_url,
      };
      //  now
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
      }
    }
    console.log("image url", res.data);
  };
  return (
    <div>
      <SectionTitle heading="add a item" subHeading="Whats New"></SectionTitle>

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
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
