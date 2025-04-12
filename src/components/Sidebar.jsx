import React from "react";
import "../css/landing.css";
import Learn from "../icons/learn.svg";
import Book from "../icons/book_new.png";
import Blog from "../icons/blog.png";
import Research from "../icons/research-paper.png";
import { useNavigate } from "react-router-dom";
import logo from "../icons/logo_new.png";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tooltip } from "react-tooltip";

export default function Sidebar() {
  const navigate = useNavigate();
  const route = window.location.href;

  console.log(route);
  return (
    <div className="sidebar">
      <div className="logo" onClick={() => navigate("/blogs")}>
        <img src={logo} alt="" />
        <span>arion</span>
      </div>
      <div
        className={route.includes("blogs") ? "active" : "inactive"}
        onClick={() => {
          navigate("blogs");
        }}
        data-tooltip-id="blogs"
      >
        <img src={Blog} alt="" className="learn__img" />
        <Tooltip
          id="blogs"
          place="right"
          content="Blogs"
        />
        <span className="learn__text">BLOGS</span>
      </div>
      <div
        className={route.includes("books") ? "active" : "inactive"}
        onClick={() => {
          navigate("/books");
        }}
        data-tooltip-id="books"
      >
        <img src={Book} alt="" className="learn__img" />
        <Tooltip
          id="books"
          place="right"
          content="Books"
        />
        <span className="learn__text">BOOKS</span>
      </div>
      <div
        className={route.includes("research-papers") ? "active" : "inactive"}
        onClick={() => {
          // in this add a search functionality too, that finds papers from the web
          navigate("/research-papers");
        }}
        data-tooltip-id="rp"
      >
        <img src={Research} alt="" className="learn__img" />
        <Tooltip
          id="rp"
          place="right"
          content="Research Paper"
        />
        <span className="learn__text">RESEARCH PAPERS</span>
      </div>
      <div
        className={route.includes("add-yours") ? "active" : "inactive"}
        onClick={() => {
          navigate("/add-yours");
        }}
        data-tooltip-id="ay"
      >
        <img src={Learn} alt="" className="learn__img" />
        <Tooltip
          id="ay"
          place="right"
          content="Add Yours"
        />
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
