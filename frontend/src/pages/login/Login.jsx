import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/slice/authSlice";
import "./login.scss";
import { useSignInUsersMutation } from "../../context/api/userApi";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [signIn, { data, isError, isSuccess }] = useSignInUsersMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    if (isSuccess && data) {
      const token = data.payload;
      dispatch(setToken(token));
      navigate("/home");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h3>Login</h3>
        <label htmlFor="username">
          <span>Username</span>
          <input
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter Username"
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
