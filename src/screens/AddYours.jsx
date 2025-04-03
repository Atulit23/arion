import React, { useState } from "react";
import styles from "../css/yours.module.css";
import book from "../icons/book.png";
import upload from "../icons/upload.png";
import ResearchPaper from "../components/ResearchPaper";

export default function AddYours() {
  const [chosen, setChosen] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  console.log(file)

  // will take name, file & type
  const uploadFile = () => {

  }

  return loading === false ? chosen === "" ? (
    <div className={styles.container}>
      <span className={styles.title}>Add Your Document</span>
      <span className={styles.subTitle}>
        Please select one of the listed options to proceed
      </span>
      <div className={styles.further__options}>
        <div
          className={styles.current__option}
          onClick={() => {
            setChosen("Book");
          }}
        >
          <img src={book} alt="" />
          <span>Books</span>
        </div>
        <div
          className={styles.current__option}
          onClick={() => {
            setChosen("Research Paper");
          }}
        >
          <img src={book} alt="" />
          <span>Research Papers</span>
        </div>
        <div
          className={styles.current__option}
          onClick={() => {
            setChosen("Blog");
          }}
        >
          <img src={book} alt="" />
          <span>Blogs</span>
        </div>
      </div>
    </div>
  ) : (
    chosen === "Research Paper" && (
        <ResearchPaper setChosen={setChosen}/>
    )
  ):
  <div>

  </div>
}
