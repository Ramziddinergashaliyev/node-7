import React, { useState } from "react";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../context/api/userApi";
import "./cards.scss";
import Form from "../form/Form";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Cards = () => {
  const [deleteUsers, { data: del }] = useDeleteUsersMutation();
  const [show, setShow] = useState(false);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { data } = useGetUsersQuery({ limit: 3 });
  console.log(data);

  const userData = data?.payload?.map((el) => (
    <div key={el._id} className="user__card">
      <div className="user__card__img">
        <img src={el?.url} alt="" />
      </div>
      <div className="user__card__info">
        <h3>
          {el?.fname} {el?.lname}
        </h3>
        <p>{el?.username}</p>
      </div>
      <div className="user__card__btns">
        <button onClick={() => deleteUsers(el?._id)}>delete</button>
        <button>edit</button>
      </div>
    </div>
  ));

  console.log(data?.total);

  return (
    <div className="user container">
      {show ? (
        <>
          <Form />
          <div onClick={() => setShow(false)} className="user__overlay"></div>
        </>
      ) : (
        <></>
      )}
      <div className="user__edit">
        <button onClick={() => setShow(true)}>+ Create</button>
      </div>
      <div className="user__cards">{userData}</div>
    </div>
  );
};

export default Cards;
