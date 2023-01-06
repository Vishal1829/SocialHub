import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { init } from "ityped";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const birth = useRef();
  const history = useHistory();

  const textRef = useRef();

  const loginRedirect = () => {
    window.location.href = "/login";
  }

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["NITK SOCIAL HUB"],
    });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        dob: birth.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <span className="loginLogo" ref={textRef}></span>
          <span className="loginDesc">
            Connect with friends of NITK on NITK SOCIAL HUB.
          </span>
        </div>
        <div className="loginRight">
          <form className="SignupBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="BirthDay"
              required
              ref={birth}
              className="loginInput"
              type="date"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              title="Email should be of @nitk.edu.in"
              pattern="^[a-zA-Z0-9+_.-]+@nitk.edu.in$"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={loginRedirect}>
              Log in to your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
