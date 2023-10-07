import "./commentForm.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

export default function CommentForm({ post, setPost }) {
  const [desc, setDesc] = useState();
  const [comment, setComment] = useState([]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      username: user.username,
      desc,
    };

    const config = {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    };
    try {
      const res = await axios.post(
        `/posts/${post._id}/comments`,
        newComment,
        config
      );
      setComment(res.data);
      setPost({ ...post, comment });

      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="commentForm">
      {user ? (
        <h2 className="commentTitle">Add Comments</h2>
      ) : (
        <h2 className="commentTitle">
          Please{" "}
          <Link to="/login" className="link">
            login{" "}
          </Link>
          to add comments
        </h2>
      )}
      <form onSubmit={handleSubmit}>
        {user ? (
          <textarea
            className="commentTextArea"
            rows="5"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <textarea
            className="commentTextArea"
            rows="5"
            value={desc}
            disabled
          ></textarea>
        )}

        <button className="commentBtn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
