import "./login.css";
import { Context } from "../../context/Context";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }; 
    try {
      const res = await axios.post("/auth/login", { email, password }, config);
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setError(error.msg));
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div class="content-wrapper">
      <div class="content">
        <div class="signup-wrapper shadow-box">
          <div class="company-details ">
            <div class="shadow"></div>
            <div class="wrapper-1">
              <div class="logo">
                <div class="icon-food"></div>
              </div>
              <Link to="/" className="link">
                <h1 class="title">BAPP</h1>
              </Link>
              <div class="slogan">Ready to dive back into the world of fascinating stories, helpful tips, and inspiring conversations?</div>
            </div>
          </div>
          <div class="signup-form ">
            <div class="wrapper-2">
              <div class="form-titlelogin">LOGIN</div>
              {error && <p className="errorLogin">{error}</p>}
              <div class="form">
                <form onSubmit={handleSubmit}>
                  <p class="content-item">
                    <label>
                      <b>Email</b>{" "}
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </p>
                  <p class="content-item">
                    <label>
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />{" "}
                  </p>

                  <button className="registerLoginButton" type="submit">
                    Login
                  </button>
                  <p class="messageLogin">
                    Not registered?{" "}
                    <a href="/register">
                      {" "}
                      <b>Create an account</b>
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
