import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/learn.css";
import Back from "../icons/back.png";
import "mathjax/es5/tex-mml-chtml";
import axios from "axios";
import { choose } from "../redux/slices/appSlice";

export default function CurrentLesson() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(0);
  const chosen = useSelector((state) => state.app.chosen);
  const level = useSelector((state) => state.app.level);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()

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

  const updateProgress = async () => {
    setCurrentLevel(currentLevel + 1);
    
    let arr = [...chosen?.levelsCompleted]
    arr.push(currentLevel + 1)
    arr = [...new Set(arr)];

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8000/documents/update`,
        {levelsCompleted: arr, id: chosen._id},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(choose(res?.data?.document))
    } catch (err) {
      console.log(err)  
    }
  }

  useEffect(() => {
    setCurrentLevel(level);
  }, [level]);

  const LevelContent = ({ data, currentLevel }) => {
    const content = data[Object.keys(data)[currentLevel]]?.content || "";
    console.log(content)

    const bulletPoints = (() => {
      let protectedContent = content;
      
      const abbreviations = [
        'e.g.', 'i.e.', 'etc.', 'vs.', 'fig.', 
        'eq.', 'cf.', 'no.', 'p.', 'pp.'
      ];
      
      let placeholders = {};
      let placeholderIndex = 0;
      
      const codePattern = /\w+\.\w+/g;
      protectedContent = protectedContent.replace(codePattern, (match) => {
        const placeholder = `__CODE_PLACEHOLDER_${placeholderIndex++}__`;
        placeholders[placeholder] = match;
        return placeholder;
      });
      
      for (const abbr of abbreviations) {
        const regex = new RegExp(abbr.replace(/\./g, '\\.'), 'g');
        protectedContent = protectedContent.replace(regex, (match) => {
          const placeholder = `__ABBR_PLACEHOLDER_${placeholderIndex++}__`;
          placeholders[placeholder] = match;
          return placeholder;
        });
        
        const regexWithComma = new RegExp(abbr.replace(/\./g, '\\.') + ',', 'g');
        protectedContent = protectedContent.replace(regexWithComma, (match) => {
          const placeholder = `__ABBR_PLACEHOLDER_${placeholderIndex++}__`;
          placeholders[placeholder] = match;
          return placeholder;
        });
      }
      
      const splits = protectedContent.split(/\.(?!\d)/);
      
      return splits.map(point => {
        let restored = point;
        for (const [placeholder, original] of Object.entries(placeholders)) {
          restored = restored.replace(new RegExp(placeholder, 'g'), original);
        }
        return restored.trim();
      }).filter(point => point !== "");
    })();

    const formatBiotonic = (text) => {
      return text.split(" ").map((word, index) => {
        const splitPoint = Math.ceil(word.length / 2);
        return (
          <span key={index}>
            <b>{word.slice(0, splitPoint)}</b>
            {word.slice(splitPoint)}{" "}
          </span>
        );
      });
    };

    useEffect(() => {
      if (!window.MathJax) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }, []);

    useEffect(() => {
      window.MathJax?.typeset();
    }, [content]);

    return (
      <div className="level__content">
        <ul>
          {bulletPoints.map((point, index) => (
            <li key={index} style={{ marginBottom: "0.7rem" }}>
              <span className="mathjax lc__text">
                • {formatBiotonic(point.trim())}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="current__lesson">
      <div className="current__lesson__middle">
        <div className="current__lesson__top">
          <div className="cross" onClick={() => navigate(-1)}>
            <img src={Back} alt="" />
          </div>
          <div className="tqdm__main__c">
            <div className="tqdm__outer__c">
              <div
                className="tqdm__inner__c"
                style={{
                  width: `${(currentLevel / (Object.keys(data).length - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="level__title">
            <span>{data[Object.keys(data)[currentLevel]]?.title}</span>
          </div>
          <LevelContent data={data} currentLevel={currentLevel} />
        </div>
      </div>
      <div className="bottom">
        <div
          className="previous"
          onClick={() => {
            if (currentLevel > 0) {
              setCurrentLevel(currentLevel - 1);
            }
          }}
        >
          <span>PREVIOUS</span>
        </div>
        <div className="next" onClick={() => {
            if (currentLevel < Object.keys(data).length - 1) {
              updateProgress()
            } else {
              updateProgress()
              navigate('/take-quiz')
            }
          }}>
          <span>{currentLevel < (Object.keys(data).length - 1) ? 'NEXT' : 'TAKE QUIZ'}</span>
        </div>
      </div>
    </div>
  );
}
