import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormRegis from "../../components/formRegis/FormRegis";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-15 characters and include at least 1 letter, 1 number",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,15}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/auth/register",
        {
          ...values,
          [e.target.name]: e.target.value,
        },
        config
      );
      localStorage.setItem("token", res.data.token); 
       window.location.replace("/login");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setError(error.msg));
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
                <h1 class="title">BAPP </h1>
              </Link>
              <div class="slogan">Join the our Blogging community—where every click unlocks a world
               of inspiration, connection, and endless stories waiting to be explored. Sign up now 
               and let your journey begin!</div>
            </div>
          </div>
          <div class="signup-form ">
            <div class="wrapper-2">
              <div class="form-title">REGISTER</div>
              
              <div class="form">
                <form className="formRegis" onSubmit={handleSubmit}>
                  {inputs.map((input) => (
                    <FormRegis
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}
                  {error && <p className="error">{error}</p>}
                  <button className="btnRegis">Register</button>
                  <p class="messageRegis">
                    Already have an account?{" "}
                    <a href="/login" className="link">
                      {" "}
                      <b>Sign in</b>
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
