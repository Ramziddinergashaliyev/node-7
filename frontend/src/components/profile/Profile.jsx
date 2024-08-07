import React, { useState, useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateUsersMutation,
} from "../../context/api/userApi";
import "./profile.scss";
import Modul from "../modul/Modul";

const Profile = () => {
  const { data } = useGetProfileQuery();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    gender: "",
    url: "",
  });
  const [updateProfile] = useUpdateUsersMutation();

  useEffect(() => {
    if (data?.payload) {
      setFormData({
        fname: data.payload.fname || "",
        lname: data.payload.lname || "",
        username: data.payload.username || "",
        gender: data.payload.gender || "",
        url: data.payload.url || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    setEdit(false);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h3>{`${data?.payload?.fname} ${data?.payload?.lname}`}</h3>
      </div>
      <div className="profile-info">
        <div className="profile-item">
          <span className="label">Username:</span>
          <span className="value">{data?.payload?.username}</span>
        </div>
        <div className="profile-item">
          <span className="label">Gender:</span>
          <span className="value">{data?.payload?.gender}</span>
        </div>
        <div className="profile-item">
          <span className="label">Age:</span>
          <span className="value">{data?.payload?.age}</span>
        </div>
        <div className="profile-btn">
          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
        {edit && (
          <Modul close={() => setEdit(false)} width={500} bg={"#aaa6"}>
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="fname">First Name:</label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  value={formData.fname}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Last Name:</label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  value={formData.lname}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="url">Profile URL:</label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Profile URL"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
              </div>
              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEdit(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </Modul>
        )}
      </div>
    </div>
  );
};

export default Profile;
