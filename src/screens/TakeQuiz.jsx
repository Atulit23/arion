import React, { useEffect, useState } from "react";
import styles from "../css/quiz.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Back from "../icons/back.png";
import { choose, storeAnswers } from "../redux/slices/appSlice";
import axios from "axios";

export default function TakeQuiz() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [current, setCurrent] = useState({});
  const chosen = useSelector((state) => state.app.chosen);
  const [selected, setSelected] = useState({});
  // const data = useSelector((state) => state.app.currentData);
  const [data, setData] = useState([]);
  const [leftOffset, setLeftOffset] = useState(0);
  const [scores, setScores] = useState({}); // score, level & question numbers of the incorrect ones

  useEffect(() => {
    fetch(chosen?.quizDocumentUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error("Error loading JSON:", error));
  }, [chosen]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const cq = document.getElementById("cq");
    const co = document.getElementById("co");
    if (cq && co) {
      const cqRect = cq.getBoundingClientRect();
      const coRect = co.getBoundingClientRect();
      const newLeft = cqRect.left - coRect.left;
      console.log(newLeft);
      setLeftOffset(newLeft);
    }
  }, []);

  const computeScores = (answers) => {
    let newScores = {};
    let newTotalScore = 0;
    let newFinalScore = 0;

    let dataKeys = Object.keys(data);
    let dataValues = Object.values(data);
    let answerValues = Object.values(answers);

    console.log(dataKeys);
    console.log(answerValues);

    for (let i = 0; i < dataKeys.length; i++) {
      let currentScore = {
        total: dataValues[i].length,
        score: 0,
        incorrectAnwers: [],
        collapsed: false,
      };
      dataValues[i]?.map((item, index) => {
        if (answerValues[i] && item?.answer === answerValues[i][index]) {
          currentScore.score = currentScore.score + 1;
        } else {
          currentScore.incorrectAnwers.push(item);
        }
      });
      newScores[dataKeys[i]] = currentScore;
    }

    Object.values(newScores).map((item, index) => {
      newTotalScore += item?.total;
      newFinalScore += item?.score;
    });

    setScores(newScores);
    dispatch(storeAnswers({scores: newScores, answers: selected}))
    storeResults(newFinalScore, newScores)
  };

  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setCurrent(data[Object.keys(data)[currentLevel]][currentQuestion]);
    }
  }, [data, currentLevel, currentQuestion]);

  const storeResults = async (finalScore, scores) => {
    let obj = {
      id: chosen?._id,
      quizTaken: true,
      quizResults: [scores],
      numQuizScore: finalScore,
    };
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8000/documents/update`,
        obj,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(choose(res?.data?.document));
      navigate('/results');
    } catch (err) {
      console.log(err);
    }
  };

  // const current = data[Object.k/eys(data)[currentLevel]]?.[currentQuestion] || {};

  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <div className={styles.current__lesson__top}>
          <div className={styles.cross} onClick={() => navigate(-1)}>
            <img src={Back} alt="" />
          </div>
          <div className={styles.tqdm__main__c}>
            <div className={styles.tqdm__outer__c}>
              <div
                className={styles.tqdm__inner__c}
                style={{
                  width: `${
                    (currentLevel / (Object.keys(data).length - 1)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.content__info}>
          <span className={styles.level__num}>Level {currentLevel + 1}</span>
          <div id="cq" className={styles.cq}>
            <span className={styles.question}>
              Q{currentQuestion + 1}. {current?.question}
            </span>
          </div>

          <div
            className={styles.options}
            id="co"
            style={{ position: "relative", left: `${leftOffset}px` }}
          >
            {current?.options?.map((item, index) => {
              return (
                <div
                  className={styles.current__option}
                  onClick={() => {
                    let arr = { ...selected };
                    if (!arr[Object.keys(data)[currentLevel]]) {
                      arr[Object.keys(data)[currentLevel]] = [];
                    }
                    arr[Object.keys(data)[currentLevel]][currentQuestion] =
                      item;
                    setSelected(arr);
                  }}
                >
                  <div
                    className={styles.checkbox}
                    onClick={() => {
                      let arr = { ...selected };
                      if (!arr[Object.keys(data)[currentLevel]]) {
                        arr[Object.keys(data)[currentLevel]] = [];
                      }
                      arr[Object.keys(data)[currentLevel]][currentQuestion] =
                        item;
                      setSelected(arr);
                    }}
                  >
                    {selected[Object.keys(data)[currentLevel]] &&
                      selected[Object.keys(data)[currentLevel]][
                        currentQuestion
                      ] === item && (
                        <div className={styles.inner__checkbox}></div>
                      )}
                  </div>
                  <span className={styles.option}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.previous}
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion(currentQuestion - 1);
            } else {
              if (currentLevel > 0) {
                setCurrentQuestion(
                  data[Object.keys(data)[currentLevel - 1]]?.length - 1
                );
                setCurrentLevel(currentLevel - 1);
              }
            }
          }}
        >
          <span>PREVIOUS</span>
        </div>
        <div
          className={
            selected[Object.keys(data)[currentLevel]] &&
            selected[Object.keys(data)[currentLevel]][currentQuestion]
              ? styles.next
              : styles.inactive__next
          }
          onClick={() => {
            if (
              selected[Object.keys(data)[currentLevel]] &&
              selected[Object.keys(data)[currentLevel]][currentQuestion]
            ) {
              if (
                currentQuestion <
                data[Object.keys(data)[currentLevel]]?.length - 1
              ) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                if (currentLevel < Object.keys(data).length - 1) {
                  setCurrentQuestion(0);
                  setCurrentLevel(currentLevel + 1);
                }
              }
            }
            if (
              currentLevel === Object.keys(data).length - 1 &&
              currentQuestion ===
                data[Object.keys(data)[currentLevel]]?.length - 1
            ) {
              // dispatch(storeAnswers(selected));
              // navigate('/results');
              computeScores(selected)
            }
          }}
        >
          <span>
            {currentLevel === Object.keys(data).length - 1 &&
            currentQuestion ===
              data[Object.keys(data)[currentLevel]]?.length - 1
              ? "GET RESULTS"
              : "NEXT"}
          </span>
        </div>
      </div>
    </div>
  );
}
