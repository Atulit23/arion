import React, { useState } from "react";
import styles from "../css/auth.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "../redux/slices/appSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../icons/logo_new.png";
import user from '../icons/user.png';
import email from '../icons/email.png';
import lock from '../icons/lock.png';
import password from '../icons/password.png';

export default function Signup() {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.app.userData);
  console.log(userData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/signup", fields);
      localStorage.setItem('token', res.data.token);
      dispatch(storeUser(res?.data?.newUser));
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logo__section}>
          <img src={logo} alt="logo" className={styles.logo} />
          <span className={styles.header}>arion</span>
        </div>
        {/* <span className={styles.info}>Please enter a unique username and a valid email.</span> */}
        <div className={styles.all}>
          <div className={styles.current}>
            {/* {<span>Username</span>} */}
            <img src={user} alt="" className={styles.user} />
            <input
              type="text"
              placeholder="Username"
              value={fields.username}
              className={styles.input}
              onChange={(e) => {
                setFields({ ...fields, username: e.target.value });
              }}
            />
          </div>
          <div className={styles.current}>
            {/* {<span>Email</span>} */}
            <img src={email} alt="" className={styles.user} />
            <input
              type="text"
              placeholder="Email"
              value={fields.email}
              className={styles.input}
              onChange={(e) => {
                setFields({ ...fields, email: e.target.value });
              }}
            />
          </div>
          <div className={styles.current}>
            {/* {<span>Password</span>} */}
            <img src={lock} alt="" className={styles.user} />
            <input
              type="password"
              placeholder="Password"
              value={fields.password}
              className={styles.input}
              onChange={(e) => {
                setFields({ ...fields, password: e.target.value });
              }}
            />
          </div>
          <div className={styles.current}>
            {/* {<span>Password</span>} */}
            <img src={password} alt="" className={styles.user} />
            <input
              type="text"
              placeholder="Confirm Password"
              value={fields.confirmPassword}
              className={styles.input}
              onChange={(e) => {
                setFields({ ...fields, confirmPassword: e.target.value });
              }}
            />
          </div>
          <div className={styles.current}>
            <img src={lock} alt="" className={styles.user} />
            <input
              type="text"
              placeholder="OTP"
              value={fields.otp}
              className={styles.input}
              style={{
                width: "54.5%",
                marginRight: '1rem'
              }}
              onChange={(e) => {
                setFields({ ...fields, otp: e.target.value });
              }}
            />
            <div className={styles.send__otp}>
              Sent OTP
            </div>
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              signup();
            }}
          >
            Sign up
          </div>
          <div className={styles.already}>
            <span>Forgot password?</span>
            <span>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}
