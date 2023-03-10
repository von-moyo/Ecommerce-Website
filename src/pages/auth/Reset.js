import React, { useState } from 'react'
import styles from "./auth.module.scss"
import ResetImg from "../../assets/forgot.png"
import { Link } from "react-router-dom"
import Card from '../../components/card/Card'
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify'

export default function Reset(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  function resetPassword(e) {
    e.preventDefault()
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success("Reset Successful! Check your email for  a reset link")
    setIsLoading(false)
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false)
  });
  }

  return (
    <>
      {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={ResetImg} alt="Reset Password" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}> 
            <input
              type="text"
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
            <div className={styles.links}>
              <p><Link to='#' onClick={props.log}>- Login</Link></p>
              <p><Link to='#' onClick={props.reg}>- Register</Link></p>
            </div>
          </form>
        </div>
      </Card>
      </section>
      </>
  )
}
