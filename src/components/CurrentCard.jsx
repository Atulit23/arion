import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { choose, storeCurrentData } from "../redux/slices/appSlice";

export default function CurrentCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data)

  useEffect(() => {
    fetch(`/data/${data?.questions}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(storeCurrentData(json))
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [data?.questions]);

  return (
    <div className="card">
      <div className="main__title">{data?.type?.toUpperCase()}</div>
      <div className="sub__title">{data?.title}</div>
      <div className="tqdm__main">
        <div className="tqdm__outer">
          <div
            className="tqdm__inner"
            style={{ width: `${(10 / 20) * 100}%` }}
          ></div>
        </div>
      </div>
      <div
        className="start"
        onClick={() => {
          dispatch(choose(data));
          navigate("/learn");
        }}
      >
        <span>START</span>
      </div>
    </div>
  );
}
