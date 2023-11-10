// import { useEffect, useState } from "react";
import useMenu from "../../../Hooks/UseMenu";
import SectionTitle from "../../../assets/Components/SectionTitle";
import MenuItem from "../../Sheard/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter((item) => item.category === "popular");
  //       setMenu(popularItems);
  //     });
  // }, []);

  return (
    <section className="mb-12">
      <SectionTitle
        heading="Form Our Menu"
        subHeading="Popular Items"></SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {popular?.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <button className="btn  items-center btn-outline border-0 border-b-4">
        View Full Menu
      </button>
    </section>
  );
};

export default PopularMenu;
