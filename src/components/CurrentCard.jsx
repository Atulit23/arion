import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { choose, storeCurrentData } from "../redux/slices/appSlice";
import styles from '../css/card.module.css'

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
    <div className={styles.card}>
      <div className={styles.main__title}>{data?.type?.toUpperCase()}</div>
      <div className={styles.sub__title}>{data?.title}</div>
      <div className={styles.tqdm__main}>
        <div className={styles.tqdm__outer}>
          <div
            className={styles.tqdm__inner}
            style={{ width: `${(10 / 20) * 100}%` }}
          ></div>
        </div>
      </div>
      <div
        className={styles.start}
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
