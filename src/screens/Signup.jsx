import React, { useState } from 'react'
import styles from '../css/auth.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { storeUser } from '../redux/slices/appSlice'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [fields, setFields] = useState({
        username: "",
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.app.userData);
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    console.log(userData)
    console.log(error)

    const signup = async () => {
        try {
            const res = await axios.post("http://localhost:8000/auth/signup", fields);
            console.log(res?.data?.newUser);
            dispatch(storeUser(res?.data?.newUser));
            navigate('/blogs')
        } catch (err) {
            console.error(err.response?.data);
            console.log(err.message)
            setError(err.response?.data)
            let e = err.message
            toast.error(err.response?.data?.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <span className={styles.header}>arion</span>
                <div className={styles.all}>
                    <div className={styles.current}>
                        {<span>Username</span>}
                        <input type="text" placeholder='Username...' value={fields.username} className={styles.input} onChange={(e) => {
                            setFields({ ...fields, username: e.target.value })
                        }} />
                    </div>
                    <div className={styles.current}>
                        {<span>Email</span>}
                        <input type="text" placeholder='Email...' value={fields.email} className={styles.input} onChange={(e) => {
                            setFields({ ...fields, email: e.target.value })
                        }} />
                    </div>
                    <div className={styles.current}>
                        {<span>Password</span>}
                        <input type="text" placeholder='Password...' value={fields.password} className={styles.input} onChange={(e) => {
                            setFields({ ...fields, password: e.target.value })
                        }} />
                    </div>
                    <div className={styles.btn} onClick={() => {
                        signup()
                    }}>
                        Sign up
                    </div>
                    <div className={styles.already}>
                        Already have an account? Login
                    </div>
                </div>
            </div>
        </div>
    )
}
