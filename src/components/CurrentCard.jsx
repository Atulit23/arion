import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { choose, storeCurrentData } from "../redux/slices/appSlice";
import styles from "../css/card.module.css";

export default function CurrentCard({ data, route }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);

  const updateQuestions = async () => {
    fetch(data?.quizDocumentUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      dispatch(storeCurrentData(json));
      console.log(route)
      console.log(`/${route}/learn`)
      navigate(`/${route}/learn`);
    })
    .catch((error) => console.error("Error loading JSON:", error));
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.main__title}>{data?.type?.toUpperCase()}</div>
        <div className={styles.sub__title}>{data?.title}</div>
        <div className={styles.tqdm__main}>
          <div className={styles.tqdm__outer}>
            <div
              className={styles.tqdm__inner}
              style={{
                width: `${
                  (data?.levelsCompleted?.length / data?.numMaxLevels) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={styles.start}
        onClick={() => {
          dispatch(choose(data));
          updateQuestions()
        }}
      >
        <span>START</span>
      </div>
    </div>
  );
}
