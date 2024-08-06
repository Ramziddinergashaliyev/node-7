import React, { useState } from "react";
import "./login.scss";
import { useSignInUsersMutation } from "../../context/api/userApi";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [value, setValue] = useState(initialState);
  const [signIn, { data }] = useSignInUsersMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { value, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(value);
    navigate("/home");
  };

  return (
    <div className="login">
      <div className="login__user">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login__form" action="">
          <label htmlFor="">
            Username
            <input
              value={value.username}
              name="username"
              onChange={handleChange}
              placeholder="username"
              type="text"
            />
          </label>
          <label htmlFor="">
            Password
            <input
              value={value.password}
              name="password"
              onChange={handleChange}
              placeholder="password"
              type="text"
            />
          </label>
          <button>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
