import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import styles from "./auth.module.scss"
import RegisterImg from "../../assets/register.png"
import { Link, useNavigate } from "react-router-dom"
import Card from '../../components/card/Card'
// import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Register(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { log, remove } = props;

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
    }

    setIsLoading(true);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        remove()
        setIsLoading(false)
        toast.success("Registration Successful!")
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });

  }

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder='Confirm Password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className='--btn --btn-primary --btn-block' type='submit'>Register</button>
            </form>
            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to='#' onClick={log}>Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={RegisterImg} alt="Register to get an account" width="400" />
        </div>
      </section>
    </>
  )
}

export default Register

