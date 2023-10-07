import "./profile.css";
import Topbar from "../../components/topbar/TopBar";
import Footer from "../../components/footer/Footer";
import Posts from "../../components/posts/Posts";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";
import { Context } from "../../context/Context";
import { Add, Remove, Message } from "@mui/icons-material";
import { Link } from "react-router-dom";
import messager from "../../image/mess.png"

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const PF = "http://localhost:5000/images/";
  const { user: currentUser, dispatch } = useContext(Context);
  const [conversations, setConversations] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts/profile/" + username);
        setPosts(res.data);
      } catch (error) {}
    };
    fetchPosts();
  }, [search]);

  const handleClickFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const handleClickChat = async () =>{
    try{
      const res = await axios.post("/conversations",{
        senderId: currentUser._id,
        receiverId:user._id        
      })
      setConversations(res.data)
    }catch(err){}
  }
  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileWrapper">
          <div className="profileTop">
            <img
              className="banner"
              src="https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg"
              alt=""
            />
            <img className="profileUserImg" src={PF + user.profilePic} alt="" />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <p className="profileInfoDesc">{user.email}</p>
            <div className="profileChat">
              {user.username !== currentUser.username && (
                <button className="btnFollow" onClick={handleClickFollow}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add />}
                </button>
              )}
              <Link to={`/messager`} className="link">
                {user.username !== currentUser.username && (
                  <button className="btnMess " onClick={handleClickChat}>
                    Chat <Message />
                  </button>
                )}
              </Link>
            </div>
          </div>

          <div className="profilePost">
            <Posts posts={posts} />
          </div>
        </div>
        <div class="up-arrow">
          <a href={`/messager`}>
            <img
              src= {messager}
              className="icon-arrow"
            />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
