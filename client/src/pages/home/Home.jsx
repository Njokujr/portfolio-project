import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Panigation from "../../components/pagination/Pagination";
import Sidebar from "../../components/sidebar/Sidebar";
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Topbar from "../../components/topbar/TopBar";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Search } from "@mui/icons-material";
import messager from "../../image/mess.png"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("/posts" + search);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
    };
    fetchPosts();
  }, [search]);

  useEffect(() => { 
    const fetchCats = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    fetchCats();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/posts/search/${searchText}`);
      setPosts(
        res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Topbar />
      <Header />
      {user && (
        <div class="up-arrow">
          <a href={`/messager`}>
            <img
              src= {messager}
              className="icon-arrow"
            />
          </a>
        </div>
      )} 

      <div className="postCategory">
        <ul className="categoryList">
          {categories.map((cat) => (
            <Link to={`/?cat=${cat.name}`} className="link" key={cat._id}>
              <li className="categoryListItem" key={cat._id}>
                <button className="catListBtn">{cat.name}</button>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="homeItemSearch">
        
        <input
          placeholder="Search title blog"
          className="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Search className="searchIcon" onClick={ handleSearch} 
        />
      </div>

      <div className="home">
        <Posts posts={currentPosts} loading={loading} />
        <Sidebar />
      </div>
      <Panigation
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <Footer />
    </>
  );
}
