import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from "./Header.module.scss"
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import Login from '../../pages/auth/Login'
import Reset from '../../pages/auth/Reset'
import Register from '../../pages/auth/Register'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogOut, { ShowOnLogIn } from '../hiddenLink/hiddenLink'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const logo = (
  <div className={styles.logo}>
    <NavLink to="/">
      <h2>e<span>Shop</span>.</h2>
    </NavLink>
  </div>
)

const activeLink = ({ isActive }) => {
  return isActive ? `${styles.active}` : ""
}

export default function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const [userName, setUserName] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  const log = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowReset(false);
  }
  const reg = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowReset(false);
  }
  const reset = () => {
    setShowReset(true);
    setShowLogin(false);
    setShowRegister(false);
  }
  function modalState() {
    setModalShow(false);
  }

  function MyVerticallyCenteredModalLogin(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {showLogin &&
          <Login
          reg={reg}
          reset={reset}
          remove = {modalState}
          />}
        {showReset &&
          <Reset
          log={log}
          reg={reg}
          />}
        {showRegister &&
          <Register
          log={log}
          remove = {modalState}
          />} 
      </Modal>
    );
  }

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logoutUser = (e) => {
    e.preventDefault()
    const auth = getAuth();
    signOut(auth).then(() => {
      toast.success("Logged out Successfully!")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        const { uid, email, displayName } = user;
        if (displayName === null) {
          const userName1 = email.substring(0, email.indexOf("@"));
          const userName2 = userName1.charAt(0).toUpperCase() + userName1.slice(1)
          setUserName(userName2)
          // console.log(userName2);
        } else {
          setUserName(displayName)
        }

        dispatch(SET_ACTIVE_USER({
          email: email,
          userName: displayName ? displayName : userName,
          userID: uid
        }))
      } else {
        setUserName('')
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, userName])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const [result, setResult] = useState(0);
  function increase() {
    setResult(result + 1)
  }

  const cart = (
    <span className={styles.cart} onClick={increase}>
      <NavLink className={activeLink} to={"/cart"}>Cart <FaShoppingCart size={20} /><p>{result}</p></NavLink>
    </span>
  )

  return (
    <>
      <MyVerticallyCenteredModalLogin
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <header>
        <div className={styles.header}>
          {logo}
          <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
            <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}

              onClick={hideMenu}>
            </div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to={"/"} className={activeLink}>Home</NavLink>
              </li>
              <li>
                <NavLink className={activeLink} to={"/contact"}  >Contact Us</NavLink >
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogIn>
                  <p onClick={log}>
                  <NavLink variant="primary" className={modalShow ? activeLink : ""} to="#" onClick={() => setModalShow(true)}>Login</NavLink>
                  </p>
                </ShowOnLogIn>
                <ShowOnLogOut>
                  <a href="#home" style={{ color: "#ff7722" }}><FaUserCircle size={16} />Hi, {userName}</a>
                  <NavLink className={activeLink} to={"/order-history"}>My Orders</NavLink >
                  <NavLink onClick={logoutUser} to={"/"} >Logout</NavLink >
                </ShowOnLogOut>
              </span>
              {cart}
            </div>
          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  )
}
