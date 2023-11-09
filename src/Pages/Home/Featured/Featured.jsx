import SectionTitle from "../../../assets/Components/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import "./Featured.css";
const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-20">
      <SectionTitle
        subHeading="check it out"
        heading="Featured Item"></SectionTitle>
      <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36 ">
        <div>
          <img src={featuredImage} alt="" />
        </div>
        <div className="md:ml-10">
          <p>Aug 20, 2029</p>
          <p className="uppercase">Where can i get some?</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            dolore totam velit, deserunt voluptatibus ullam! Quam, adipisci
            tempore. Nulla mollitia dicta, eum dignissimos repellat nostrum aut
            laboriosam, deleniti in nesciunt, eos praesentium minima odit
            eligendi corrupti suscipit perferendis labore ex et optio ea
            perspiciatis dolorem cupiditate cumque! Deserunt, nesciunt debitis?
          </p>
          <button className="btn btn-outline border-0 border-b-4">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
