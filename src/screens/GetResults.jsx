import React, { useEffect, useState } from "react";
import styles from "../css/quiz.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Back from "../icons/back.png";
import SmallPlay from "../icons/small_play.png";
import axios from "axios";
import { choose } from "../redux/slices/appSlice";

export default function GetResults() {
  const all = useSelector((state) => state.app.answers);
  const [scores, setScores] = useState([])
  const navigate = useNavigate();
  const chosen = useSelector((state) => state.app.chosen);
  const [finalScore, setFinalScore] = useState(0);
  const [totalScrore, setTotalScore] = useState(0); // final will be out of this
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    setScores(all?.scores)
    setAnswers(all?.answers)
  }, [scores])

  // const data = useSelector((state) => state.app.currentData);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(chosen?.quizDocumentUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((json) => setData(json))
  //     .catch((error) => console.error("Error loading JSON:", error));
  // }, [chosen]);

  // console.log(answers);

  const computeScores = () => {
    // let newScores = {};
    let newTotalScore = 0;
    let newFinalScore = 0;

    // let dataKeys = Object.keys(data);
    // let dataValues = Object.values(data);
    // let answerValues = Object.values(answers);

    // console.log(dataKeys);
    // console.log(answerValues);

    // for (let i = 0; i < dataKeys.length; i++) {
    //   let currentScore = {
    //     total: dataValues[i].length,
    //     score: 0,
    //     incorrectAnwers: [],
    //     collapsed: false,
    //   };
    //   dataValues[i]?.map((item, index) => {
    //     if (answerValues[i] && item?.answer === answerValues[i][index]) {
    //       currentScore.score = currentScore.score + 1;
    //     } else {
    //       currentScore.incorrectAnwers.push(item);
    //     }
    //   });
    //   newScores[dataKeys[i]] = currentScore;
    // }

    Object.values(scores).map((item, index) => {
      newTotalScore += item?.total;
      newFinalScore += item?.score;
    });

    setTotalScore(newTotalScore);
    setFinalScore(newFinalScore);
  };

  useEffect(() => {
    computeScores();
  }, [scores]);

  const dispatch = useDispatch();

  // const storeResults = async () => {
  //   let obj = {
  //     id: chosen?._id,
  //     quizTaken: true,
  //     quizResults: [scores],
  //     numQuizScore: finalScore,
  //   };
  //   const token = localStorage.getItem("token");

  //   try {
  //     const res = await axios.post(
  //       `http://localhost:8000/documents/update`,
  //       obj,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(res.data);
  //     dispatch(choose(res?.data?.document));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   storeResults();
  // }, [scores]);

  console.log(scores);

  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <div className={styles.current__lesson__top}>
          <div className={styles.cross} onClick={() => navigate("/blogs")}>
            <img src={Back} alt="" />
          </div>
          <div className={styles.tqdm__main__c}>
            <div className={styles.tqdm__outer__c}>
              <div
                className={styles.tqdm__inner__c}
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.results}>
          <div className={styles.rt__top}>
            <span className={styles.total__score}>
              Total Score: {finalScore} / {totalScrore}
            </span>
            <span className={styles.breakdown}>
              Here's a level wise breakdown:
            </span>
          </div>
          {Object.keys(scores)?.map((item, index) => {
            return (
              <div className={styles.current__result}>
                <div className={styles.cr__top}>
                  <img
                    src={SmallPlay}
                    alt=""
                    onClick={() => {
                      let arr = { ...scores };
                      arr[item].collapsed = !arr[item].collapsed;
                      setScores(arr);
                    }}
                    style={{
                      transform:
                        scores[item]?.collapsed === true && "rotate(90deg)",
                    }}
                  />
                  <span>
                    Level {index + 1}: {scores[item]?.score} /{" "}
                    {scores[item]?.total}
                  </span>
                </div>
                {scores[item]?.collapsed === true &&
                scores[item]?.incorrectAnwers?.length > 0
                  ? scores[item]?.incorrectAnwers?.map((elem, curr) => {
                      return (
                        <div className={styles.current__question}>
                          <span>
                            Question {curr + 1}: {elem?.question}
                          </span>
                          <span>• Your answer: {answers[item][curr]}</span>
                          <span>• Correct answer: {elem?.answer}</span>
                        </div>
                      );
                    })
                  : scores[item]?.collapsed === true && (
                      <div className={styles.current__question}>
                        <span>You got nothing wrong on this level! Yay</span>
                      </div>
                    )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.previous} style={{ opacity: 0 }}>
          <span></span>
        </div>
        <div
          className={styles.next}
          onClick={() => {
            navigate("/blogs");
          }}
        >
          <span>HOME</span>
        </div>
      </div>
    </div>
  );
}
