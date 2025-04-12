import React, { useEffect, useState } from "react";
import styles from "../css/view.module.css";
import CurrentCard from "../components/CurrentCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";

export default function ViewBooks() {
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
        <div className={styles.header__main}>
          <input placeholder="Books" className={styles.header} />
          <div className={styles.profile}>
            {userData?.username && (
              <div className={styles.icon}>
                {userData?.username[0]?.toUpperCase()}
              </div>
            )}
            <FaChevronDown className={styles.down}/>
          </div>
        </div>
        <div className={styles.cards}>
          {blogData
            ?.filter((elem) => elem?.type === "Book")
            ?.map((item) => {
              return (
                <>
                  <CurrentCard data={item} route={"books"} />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
