import Topbar from "../../components/topbar/TopBar";
import Footer from "../../components/footer/Footer";
import { HistoryEduOutlined } from "@mui/icons-material";

import "../aboutus/aboutus.css";

export default function Aboutus() {
  return (
    <>
      <Topbar />
      <div className="about">
        <div className="container">
          <div className="aboutWrapper"></div>

          <div className="Title">
            <h1 className="aboutSm">ABOUT US</h1>
          </div>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; </p>
          <div className="aboutDesc">
            <p className="desc">
            At BAPP, we believe in the power of words to inspire, educate, 
            and connect people from all walks of life. Our mission is to create a space where 
            voices are heard, stories are celebrated, and ideas come to life. We are committed 
            to providing content that sparks curiosity, fosters dialogue, and enriches lives.
            </p>
            <img
              className="aboutImg1"
              src="https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg"
              alt=""
            />
          </div>
          <div className="aboutIT">
            <img
              className="aboutImg2"
              src="https://images.pexels.com/photos/938165/pexels-photo-938165.jpeg"
              alt=""
            />
            <p className="descIT">
            We are a passionate team of writers, creators, and enthusiasts who share a common love for storytelling. 
            Our blog is not just a platform for information; 
            it's a community built on the foundation of diverse perspectives and shared experiences.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
