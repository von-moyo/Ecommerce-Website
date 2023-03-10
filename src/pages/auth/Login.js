import React, { useState } from 'react'
import styles from "./auth.module.scss"
import LoginImg from "../../assets/login.png"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {ToastContainer, toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login(props) {
  const { remove, reg, reset} = props

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function loginUser(e) {
    e.preventDefault()
    setIsLoading(true)
    if (email && password === "") {
      toast.error("You need to enter your Email and Password!")
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        remove()
        toast.success(" Login Successful!")
        setIsLoading(false)
        navigate("/")
    
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });

  }
  //log in with google
  function signinWithGoogle(e) {
    e.preventDefault()
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        remove()
        toast.success("Login Successfull!")
        navigate("/")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    toast.error(error.message)
    // ...
  });
  }

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      {<section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={LoginImg} alt="login page" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button className='--btn --btn-primary --btn-block' type='submit'>Login</button>
              <div className={styles.links}>
                <Link to="#" onClick={reset}>Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button className="--btn --btn-danger --btn-block" onClick={signinWithGoogle}><FaGoogle color='#fff' /> Login With Google</button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to='#'
                variant="primary"
                onClick={reg} style={{ marginLeft: "10px" }}>Register</Link>
            </span>
          </div>
        </Card>
      </section>}
    </>
  )
}

export default Login
