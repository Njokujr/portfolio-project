import "./post.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          {post.photo && (
            <img className="postImg" src={PF + post.photo} alt="" />
          )}
          <div className="postInfo">
            <label className="chip">{post.categories}</label>
            <Link to={`/post/${post._id}`} className="link">
              <h3 className="postTitle">{post.title}</h3>
            </Link>
            <div className="postDesc">
              <p>{post.desc}</p>
            </div>
            <footer>
              <div className="post-author">
                <div>
                  <p className="postAuth">
                    Publish by:
                    <Link to={`/profile/${post.username}`} className="link">
                      {post.username}
                    </Link>
                  </p>
                  <p className="postDate">
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <Link
                to={`/post/${post._id}`} 
                className="show fa-solid fa-arrow-right"
              ></Link>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
