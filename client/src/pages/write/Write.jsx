import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Topbar from "../../components/topbar/TopBar";
import Footer from "../../components/footer/Footer";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      userId: user._id,
      title,
      desc,
      categories
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    const config = {
			headers: {
        token:
          "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
		};
    try {
      const res = await axios.post("/posts", newPost);
      
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return ( 
    <>
      <Topbar />
      <div className="container">
        <div className="write">
          {file && (
            <img
              className="writeImg"
              src={URL.createObjectURL(file)}
              alt=""
            ></img>
          )}
          <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>

                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <select
                className="writeCategorySelect"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              >
                <option>* Select Category</option>
                <option value="Event">Event</option>
                <option value="Sports">Sports</option>
                <option value="VanLangnews">VanLangnews</option>
                <option value="Study">Study</option>
                <option value="Technical">Technical</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Programming">Programming</option>
              </select>
            </div>
            <div className="writeTitle">
              <input
                type="text"
                placeholder="Title"
                className="writeInput"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                placeholder="Tell your story..."
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
