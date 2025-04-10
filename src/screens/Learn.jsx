import React, { useEffect, useState } from "react";
import "../css/learn.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackTeal from "../icons/back_teal.png";
import Play from "../icons/play.png";
import Tick from "../icons/tick.svg";
import { chooseLevel } from "../redux/slices/appSlice";

export default function Learn() {
  const chosen = useSelector((state) => state.app.chosen);
  const [data, setData] = useState([]);
  console.log(chosen)
  const navigate = useNavigate();

  useEffect(() => {
    fetch(chosen?.levelDocumentUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => setData(json))
    .catch((error) => console.error("Error loading JSON:", error));
  }, [chosen]);

  console.log(data);
  console.log(chosen);

  const dispatch = useDispatch();
  const isTaken = false;

  return (
    <div className="learn__container">
      <div className="learn__middle">
        <div className="learn__header">
          <div className="top">
            <img
              src={BackTeal}
              alt=""
              onClick={() => {
                navigate(-1);
              }}
            />
            <span>{chosen?.type?.toUpperCase()}</span>
          </div>
          <span>{chosen?.title}</span>
        </div>
      </div>
      <div className="levels">
        {Object.keys(data)?.map((item, index) => {
          return (
            <div className="current__level">
              {/* there will be two buttons, play & tick */}
              {chosen?.levelsCompleted?.includes(index+1) ? (
                <div
                  className="active__button"
                  onClick={() => {
                    dispatch(chooseLevel(index));
                    navigate("/current");
                  }}
                >
                  <img src={Tick} />
                </div>
              ) : (
                <div
                  className="inactive__button"
                  onClick={() => {
                    dispatch(chooseLevel(index));
                    navigate("/current");
                  }}
                >
                  <img src={Play} />
                </div>
              )}
              <span className="cl__title">{data[item]?.title}</span>
            </div>
          );
        })}
        <div className="current__level">
          {chosen?.quizTaken ? (
            <div
              className="active__button"
              onClick={() => {
                navigate("/take-quiz");
              }}
            >
              <img src={Tick} />
            </div>
          ) : (
            <div
              className="inactive__button"
              onClick={() => {
                navigate("/take-quiz");
              }}
            >
              <img src={Play} />
            </div>
          )}
          <span className="cl__title">Take Test</span>
        </div>
      </div>
    </div>
  );
}
