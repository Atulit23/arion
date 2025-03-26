import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/learn.css";
import Back from "../icons/back.png";
import "mathjax/es5/tex-mml-chtml";

export default function CurrentLesson() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(0);
  const chosen = useSelector((state) => state.app.chosen);
  const level = useSelector((state) => state.app.level);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/data/${chosen?.level}`) 
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error loading JSON:", error));
  }, [chosen?.level]);

  useEffect(() => {
    setCurrentLevel(level);
  }, [level]);

  const LevelContent = ({ data, currentLevel }) => {
    const content = data[Object.keys(data)[currentLevel]]?.content || "";

    // const bulletPoints = content
    //   .replace(/e\.g\./g, "EG_PLACEHOLDER")
    //   .replace(/e\.g\.,/g, "EG_COMMA_PLACEHOLDER")
    //   .replace(/i\.e\./g, "IE_PLACEHOLDER")
    //   .replace(/i\.e\.,/g, "IE_COMMA_PLACEHOLDER")
    //   .replace(/etc\./g, "ETC_PLACEHOLDER")
    //   .replace(/vs\./g, "VS_PLACEHOLDER")
    //   .replace(/fig\./g, "FIG_PLACEHOLDER")
    //   .replace(/eq\./g, "EQ_PLACEHOLDER")
    //   .replace(/cf\./g, "CF_PLACEHOLDER")
    //   .replace(/no\./g, "NO_PLACEHOLDER")
    //   .replace(/p\./g, "P_PLACEHOLDER")
    //   .replace(/pp\./g, "PP_PLACEHOLDER")
    //   .split(/\.(?!\d)/)
    //   .map((point) =>
    //     point
    //       .replace(/EG_PLACEHOLDER/g, "e.g.")
    //       .replace(/EG_COMMA_PLACEHOLDER/g, "e.g.,")
    //       .replace(/IE_PLACEHOLDER/g, "i.e.")
    //       .replace(/IE_COMMA_PLACEHOLDER/g, "i.e.,")
    //       .replace(/ETC_PLACEHOLDER/g, "etc.")
    //       .replace(/VS_PLACEHOLDER/g, "vs.")
    //       .replace(/FIG_PLACEHOLDER/g, "fig.")
    //       .replace(/EQ_PLACEHOLDER/g, "eq.")
    //       .replace(/CF_PLACEHOLDER/g, "cf.")
    //       .replace(/NO_PLACEHOLDER/g, "no.")
    //       .replace(/P_PLACEHOLDER/g, "p.")
    //       .replace(/PP_PLACEHOLDER/g, "pp.")
    //       .trim()
    //   )
    //   .filter((point) => point !== "");

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
          <div className="cross" onClick={() => navigate("/learn")}>
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
              setCurrentLevel(currentLevel + 1);
            } else {
              navigate('/take-quiz')
            }
          }}>
          <span>{currentLevel < (Object.keys(data).length - 1) ? 'NEXT' : 'TAKE QUIZ'}</span>
        </div>
      </div>
    </div>
  );
}
