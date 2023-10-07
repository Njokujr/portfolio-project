import "./settings.css";
import Footer from "../../components/footer/Footer";
import { useContext, useState,useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Topbar from "../../components/topbar/TopBar"

export default function Settings() {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      password,
      currentPassword
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    };
    try {
      if (password !== confirmPassword) {
        setPasswordError("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords do not match");
      }
      else{
        const res = await axios.put("/users/" + user._id, updatedUser, config);
        const keepToken = {...res.data, accessToken:JSON.parse(localStorage.getItem("user")).accessToken}; 
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess("Profile Successfully Updated");
        window.location.replace("/");
         dispatch({ type: "UPDATE_SUCCESS", payload: keepToken });
      }     
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
    <>
      <Topbar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsbox">
            <div className="settingsTitle">
            {success && <p className="success">{success}</p>}
           
              <span className="settingsUpdateTitle">UPDATE PROFILE</span>
            </div>
            <form className="settingsForm">
              <label>Profile Picture</label>
              <div className="settingsPP">
                <img
                  src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <label>Change Password </label>
              <div className="changePW">
                <label className="currentPW">Current Password:</label>
                <input
                  className="inputCurrentPW"
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="changeNewPW">
                <label className="currentPW">New Password:</label>
                <input
                  className="inputNewPW"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="notePW">(*Please enter password of 6-15 characters and include at least 1 letter, 1 number and 1 special character!*)</p>
              <div className="changePW">
                <label className="currentPW">Confirm Password:</label>
                <input
                  className="confirmPW"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button className="settingsSubmit" onClick={handleUpdate}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
