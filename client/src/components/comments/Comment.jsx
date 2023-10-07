import "./comment.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { format } from "timeago.js";

export default function Comment({ comment, post, setPost }) {
  const [desc, setDesc] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [commentEdit, setCommentEdit] = useState({});
  const { user } = useContext(Context);

  const handleUpdate = async () => {
    const config = {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    };
    const editedComment = {
      user: user._id,
      desc,
    };
    const res = await axios.put(
      `/posts/${post._id}/comments/${comment._id}`,
      editedComment,
      config
    );
    setCommentEdit(res.data);
    setPost({ ...post, commentEdit });
    window.location.reload();
  };
  const handleDelete = async () => {
    const config = {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    };
    try {
      await axios.delete(`/posts/${post._id}/comments/${comment._id}`, config);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <>
      <div className="commentWrapper">
        <div className="commentTop">
          <div className="commentUserInfo">
            <p className="commentName">{comment.username}</p>
          </div>
          {isUpdate ? (
            <textarea
              defaultValue={comment.desc}
              className="commentUpdate"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          ) : (
            <p className="commentItem">{comment.desc} </p>
          )}
        </div>
        <div className="commentBottom">
          {!isUpdate && (
            <p className="commentDate">{format(comment.date)}</p>
          )}
          {user && user.username === comment.username && (
            <div className="reaction">
              {isUpdate ? (
                <button className="commentUpdateBtn  " onClick={handleUpdate}>
                  Update
                </button>
              ) : (
                <>
                  <span
                    className="commentEdit far fa-edit"
                    onClick={() => setIsUpdate(true)}
                  ></span>
                  <span
                    className="commentDelete far fa-trash-alt"
                    onClick={handleDelete}
                  ></span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
