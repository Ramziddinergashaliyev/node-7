import React, { useEffect, useState } from "react";
import "./register.scss";
import { useCreateUsersMutation } from "../../context/api/userApi";
import { useNavigate } from "react-router-dom";

const initialState = {
  fname: "",
  lname: "",
  username: "",
  password: "",
  age: "",
  url: "",
  gender: "",
  isActive: true,
  budget: 1200,
};

const Register = () => {
  const [value, setValue] = useState(initialState);
  const [createUser, { data, isSuccess }] = useCreateUsersMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    let { value, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(value);
    // Reset form state only after successful creation
    setValue(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="user-form">
        <h3 style={{ textAlign: "center", fontSize: "30px" }}>Register</h3>
        <label htmlFor="fname">First Name:</label>
        <input
          id="fname"
          value={value.fname}
          name="fname"
          onChange={handleChange}
          placeholder="First Name"
          type="text"
          required
        />

        <label htmlFor="lname">Last Name:</label>
        <input
          id="lname"
          value={value.lname}
          name="lname"
          onChange={handleChange}
          placeholder="Last Name"
          type="text"
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={value.username}
          name="username"
          onChange={handleChange}
          placeholder="Username"
          type="text"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          value={value.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          id="age"
          value={value.age}
          name="age"
          onChange={handleChange}
          placeholder="Age"
          type="number"
          min="0"
          required
        />

        <label htmlFor="url">Profile Image URL:</label>
        <input
          id="url"
          value={value.url}
          name="url"
          onChange={handleChange}
          placeholder="Profile Image URL"
          type="url"
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={value.gender}
          name="gender"
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="budget">Budget:</label>
        <input
          id="budget"
          value={value.budget}
          name="budget"
          onChange={handleChange}
          placeholder="Budget"
          type="number"
          min="0"
          required
        />

        <button type="submit" className="submit-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
