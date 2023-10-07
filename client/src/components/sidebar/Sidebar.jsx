import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar({ post }) {
  const [posts, setPosts] = useState([]);
  const [currentPage] = useState(1);
  const [postsPerPage] = useState(6);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  });
  const handleSearch = async () => {
    try {
      await axios.get(`/posts/find/`);
    } catch (err) {}
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <p className="sidebarTitle">RECENT POSTS</p> 
        <hr />
        <div className="recentPost">
          {currentPosts.map((post) => (
            <Link to={`/post/${post._id}`} className="link">
              <div className="recentPost">
                <h3>{post.title}</h3>
                <p className="recentPostDate">{new Date(post.createdAt).toDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebarItem1">
        <span>SOCIAL NETWORK</span>
        <div className="topIcon">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-twitter-square"></i>
        </div>
      </div>

      {/* <div className="sidebarItem2">
        <img
          className="iconAds"
          src="https://m.economictimes.com/thumb/msid-54454320,width-1200,height-900,resizemode-4,imgsize-87215/online-job-market-to-double-by-2020-survey.jpg"
        />
        <a href="https://ejob.vanlanguni.edu.vn/" className="link">
        <p className="titleAds">
          
        </p></a>
      </div>
      <div className="sidebarItem2">
        <img
          className="iconAds"
          src="https://snipstock.com/assets/cdn/png/e4060e919c83110564449038922bf75b.png"
        />
        <p className="titleAds"> </p>
      </div> */}
    </div>
  );
}
