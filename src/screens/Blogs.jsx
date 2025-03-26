import React from "react";
import "../css/landing.css";
import Learn from "../icons/learn.svg";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CurrentCard from "../components/CurrentCard";

export default function Blogs() {

  const data = [
    {
      id: 1,
      type: "Blog",
      title: "Mathematics for machine learning I",
      level: "ml1_levels.json",
      questions: "ml1_questions.json",
    },
    {
      id: 2,
      type: "Blog",
      title: "Mathematics for machine learning II",
      level: "ml2_levels.json",
      questions: "ml2_questions.json",
    },
    {
      id: 3,
      type: "Blog",
      title: "LSTM from Scratch",
      level: "lstm_levels.json",
      questions: "lstm_questions.json",
    },
    {
      id: 4,
      type: "Blog",
      title: "Multi Head Latent Attention from Scratch in Python",
      level: "mla_levels.json",
      questions: "mla_questions.json",
    },
    {
      id: 5,
      type: "Blog",
      title: "Neural Network from Scratch in Python",
      level: "neural_network_levels.json",
      questions: "neural_network_questions.json",
    },
    {
      id: 5,
      type: "Blog",
      title: "Stable Diffusion I - Mathemetics Behind It",
      level: "stable_diffusion_levels.json",
      questions: "stable_diffusion_questions.json",
    },
  ];

  return (
    <div className="main__container">
      <div className="middle">
        <div className="header">
          <span>Blogs</span>
        </div>
        <div className="cards">
          {data?.map((item) => {
            return <CurrentCard data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
