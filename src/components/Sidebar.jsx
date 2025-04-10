import React from "react";
import "../css/landing.css";
import Learn from "../icons/learn.svg";
import { useNavigate } from "react-router-dom";
import logo from '../icons/logo_new.png'

export default function Sidebar() {
  const navigate = useNavigate();
  const route = window.location.href;

  console.log(route);
  return (
    <div className="sidebar">
      <div className="logo" onClick={() => navigate('/blogs')}>
        <img src={logo} alt="" />
        <span>arion</span>
      </div>
      <div
        className={(route.includes("blogs")) ? "active" : "inactive"}
        onClick={() => {
          navigate("blogs");
        }}
      >
        <img src={Learn} alt="" className="learn__img" />
        <span className="learn__text">BLOGS</span>
      </div>
      <div
        className={route.includes("books") ? "active" : "inactive"}
        onClick={() => {
          navigate("/books");
        }}
      >
        <img src={Learn} alt="" className="learn__img" />
        <span className="learn__text">BOOKS</span>
      </div>
      <div className={route.includes("research-papers") ? "active" : "inactive"} onClick={() => { // in this add a search functionality too, that finds papers from the web
          navigate("/research-papers");
        }}>
        <img src={Learn} alt="" className="learn__img" />
        <span className="learn__text">RESEARCH PAPERS</span>
      </div>
      <div className={route.includes("add-yours") ? "active" : "inactive"} onClick={() => {
          navigate("/add-yours");
        }}>
        <img src={Learn} alt="" className="learn__img" />
        <span className="learn__text">ADD YOURS</span>
      </div>
      {/* <div className={route === "discover" ? "active" : "inactive"} onClick={() => {
          navigate("/discover");
        }}>
        <img src={Learn} alt="" className="learn__img" />
        <span className="learn__text">DISCOVER</span>
      </div> */}
      {/* <div className={route === "buy" ? "active" : "inactive"} onClick={() => {
          navigate("/buy");
        }}>
        <img src={Learn} alt="" className="learn__img" />
        <span className="learn__text">BUY DRUGS</span>
      </div> */}
    </div>
  );
}
