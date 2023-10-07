import CommentForm from "../../components/formcomments/CommentForm";
import Comment from "../../components/comments/Comment";

import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState("");
  const [likes, setLikes] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState({
    message: "",
    isLoading: false,
  });

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        await axios.put(`/posts/${post._id}`, {
          username: user.username,
          title,
          desc,
        });
        setUpdateMode(false);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        window.location.replace("/");
        return setSuccess("Post Removed");
      } catch (err) {}
    }
  };

  const handleUpdate = async () => {
    const updatePost = {
      username: user.username,
      title,
      desc,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatePost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      await axios.put(`/posts/${post._id}`, updatePost);
      setUpdateMode(false);
      window.location.reload();
    } catch (err) {}
  };

  const likeHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    };
    const newLike = {
      user: user._id,
    };
    try {
      const res = await axios.put(
        `/posts/${post._id}/like`,
        { newLike },
        config
      );
      setLikes(res.data);
      setPost({ ...post, likes });

      window.location.reload();
      return setSuccess("Post Liked");
    } catch (err) {
      const error = err.response.data;
      if (error) {
        setTimeout(() => {
          setError("");
          setSuccess("");
        }, 5000);
        return setError(error.msg);
      }
    }
  };

  return (
    <>
      <div className="singlePostDetails">
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <div className="singlePostDetailsWrapper">
          {!updateMode ? (
            post.photo && (
              <img src={PF + post.photo} alt="" className="singlePostImg" />
            )
          ) : (
            <div className="updateFileInput">
              <img className="singlePostImg" src={PF + post.photo} />
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
          )}
          {updateMode ? (
            <select
              className="writeCategorySelect"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            >
              <option value={categories}>{categories}</option>
              <option value="Event">Event</option>
              <option value="Sports">Sports</option>
              <option value="VanLangnews">VanLangnews</option>
              <option value="Study">Study</option>
              <option value="Technical">Technical</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Programming">Programming</option>
            </select>
          ) : (
            <p className="writeCategory">{post.categories}</p>
          )}
          <div className="singlePostInfo">
            <p className="singlePostAuthor">
              Published by:
              <Link to={`/profile/${post.username}`} className="link">
                <b> {post.username}</b>
              </Link>{" "}
              
              <p className="singPostDate">
               on <i>{new Date(post.createdAt).toDateString()}</i>
              </p>
              &nbsp;
            </p>
          </div>
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <>
                  <div className="singlePostEdit">
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setUpdateMode(true)}
                    ></i>
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                    ></i>
                  </div>
                </>
              )}
            </h1>
          )}

          {updateMode ? (
            <textarea
              rows={50}
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode ? (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <>
               <hr />
              <div className="singlePostReactions">
                <div className="leftReaction">
                  <i
                    className=" likeReactionThumb far fa-thumbs-up"
                    onClick={likeHandler}
                  />
                  <span className="likesCount">
                    {post.likes?.length} people likes{" "}
                  </span>
                </div>
                <div className="rightReaction">
                  <span className="rightReactionCount"></span>
                  <span> {post.comments?.length} Comments</span>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
        {!updateMode && (
          <>
            <CommentForm post={post} setPost={setPost} user={user} />
            {post.comments?.length > 0 ? (
              post.comments
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    post={post}
                    user={user}
                    setPost={setPost}
                  />
                ))
                .reverse()
            ) : (
              <h2 style={{ textAlign: "center", opacity: "0.6",marginTop:"10px" }}>
                No comments for this post
              </h2>
            )}
          </>
        )}
      </div>
    </>
  );
}
