import { Link } from "react-router-dom";
import loginImage from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(AuthContext);
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) =>
      console.log(result.user)
    ),
      reset();
  };

  return (
    <div className="hero min-h-screen bg-slate-300">
      <Helmet>
        <title>Bistro Boss | Sign UP</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left text-white">
          <img src={loginImage} alt="" />
        </div>
        <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
                name="name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                })}
                name="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">
                  password must be 6 characters
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  password must be 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  password must be less 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  password must be Minimum six characters, at least one letter,
                  one number and one special character
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign UP"
                className="btn bg-[#ebc38b] hover:bg-[#fab351]"
              />
            </div>
          </form>
          <p className="py-5 flex justify-center  items-center">
            Already have an Account?
            <Link className="text-blue-600 font-semibold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
