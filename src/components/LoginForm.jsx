// import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { LoginHandler } from "./LoginHandler";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const result = await LoginHandler(data);
    console.log(result);

    if (result?.token) {
      navigate("/home");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input defaultValue="test" {...register("example")} /> */}

        <div className="form-control w-[220px]  md:w-full ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-[250px] md:w-[400px] "
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-[250px] md:w-[400px] "
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>

        <button type="submit" className="btn mt-3">
          Button
        </button>

        {/* <input type="submit" /> */}
      </form>
      {/* <button
        onClick={() => dispatch(googleUser())}
        className="btn btn-active btn-primary"
      >
        Primary
      </button> */}

      <Link to="/signup">
        {" "}
        <p className="absolute top-0 right-2 text-blue-700">Sign up</p>
      </Link>
    </div>
  );
}
