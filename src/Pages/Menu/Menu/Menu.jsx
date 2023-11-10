import { Helmet } from "react-helmet-async";
import Cover from "../../Sheard/Cover/Cover";
import menuImg from "../../../assets/menuItem/banner3.jpg";
import useMenu from "../../../Hooks/UseMenu";
import pizza from "../../../assets/menuItem/pizza-bg.jpg";
import salad from "../../../assets/menuItem/salad-bg.jpg";
import soup from "../../../assets/menuItem/soup-bg.jpg";
import dessert from "../../../assets/menuItem/dessert-bg.jpeg";
import SectionTitle from "../../../assets/Components/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const drinkss = menu.filter((item) => item.category === "drinks");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const offered = menu.filter((item) => item.category === "offered");
  const soups = menu.filter((item) => item.category === "soup");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      {/*  Main Cover */}
      <Cover img={menuImg} title={"Our Menu"}></Cover>
      <SectionTitle
        subHeading="Don't Miss"
        heading="Today's Offed"></SectionTitle>
      {/*  offered menu items  */}
      <MenuCategory items={offered}></MenuCategory>

      <MenuCategory
        items={desserts}
        title="dessert"
        coverImg={dessert}></MenuCategory>
      {/* soup menu items  */}
      <MenuCategory items={soups} title="soup" coverImg={soup}></MenuCategory>

      <MenuCategory
        items={pizzas}
        title="pizza"
        coverImg={pizza}></MenuCategory>

      <MenuCategory
        items={salads}
        title="salad"
        coverImg={salad}></MenuCategory>
      <MenuCategory
        items={drinkss}
        title="drinks"
        coverImg={soup}></MenuCategory>
    </div>
  );
};

export default Menu;
