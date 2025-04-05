import React, { useState } from "react";
import styles from "../css/yours.module.css";
import upload from "../icons/upload.png";
import Loader from "./Loader";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddDocument({ setChosen, chosen }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const userData = useSelector((state) => state.app.userData);
  console.log(file);

  const uploadFile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userData?._id);
    formData.append("type", chosen);
    formData.append("name", name);
    try {
      const res = await axios.post(
        `http://localhost:8000/documents/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(res.data);
      setLoading(false);
      setDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {chosen === "Research Paper" ? "Add a Research Paper" : "Add a Book"}
      </span>
      <span className={styles.subTitle}>
        Please give a unique name and upload the file in pdf format
      </span>
      {/* <div className={styles.go__back}>Go back</div> */}
      {loading === false && done === false && (
        <div className={styles.sub}>
          <div className={styles.name}>
            <span>Name</span>
            <input
              type="text"
              placeholder="Please enter a name"
              className={styles.input}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <span className={styles.uf__header}>Upload file</span>
          <div className={styles.mainService}>
            <div className={styles.sub__serv}>
              <div className={styles.upload__icon}>
                <img src={upload} alt="" />
              </div>
              <span className={styles.service__info}>
                {file?.name ? file?.name : (chosen === "Research Paper" ? "Upload a Research Paper" : "Upload a Book")}
              </span>
              <label className={styles.uploadLabel}>
                <div className={styles.choose}>
                  <span className={styles.info}>BROWSE FILE</span>
                  <input
                    type="file"
                    className={styles.hiddenInput}
                    accept=".pdf"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className={styles.bottom}>
            <div
              className={styles.previous}
              onClick={() => {
                setChosen("");
              }}
            >
              <span>GO BACK</span>
            </div>
            <div
              className={styles.next}
              onClick={() => {
                uploadFile();
              }}
            >
              <span>GENERATE</span>
            </div>
          </div>
        </div>
      )}
      {loading === true && done === false && <Loader />}
    </div>
  );
}
