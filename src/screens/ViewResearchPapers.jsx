import React, { useEffect, useState } from "react";
import styles from "../css/view.module.css";
import CurrentCard from "../components/CurrentCard";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ViewResearchPapers() {
  const userData = useSelector((state) => state.app.userData);
  const [blogData, setBlogData] = useState([]);

  const getUserDocs = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:8000/documents/getPrivateDocumentsByUserId?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(res.data);
      setBlogData(res.data?.documents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDocs(userData?._id);
  }, [userData]);

  return (
    <div className={styles.container}>
      <div className={styles.middle}>
        <div className={styles.header}>
          <span>Blogs</span>
        </div>
        <div className={styles.cards}>
          {blogData
            ?.filter((elem) => elem?.type === "Research Paper")
            ?.map((item) => {
              return <CurrentCard data={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
