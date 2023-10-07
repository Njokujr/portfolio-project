import "./footer.css"

export default function Footer() {
  return (
    <div>
     
        <div className="footer">
            <div className="footerContainer">
              <div className="footerContainer-1">
               {/* <img className="logofooter" src = "" ></img> */}
              </div>
              <div className="footerContainer-2">
              <h4>MENU</h4>
              
                <ul>
                  <li><a  href="/">Homepage</a></li>
                  <li><a  href="/">Blog</a></li>
                  <li><a  href="/about">About Us</a></li>
                </ul>
              </div>
              <div className="footerContainer-3">
              <h4>BAPP</h4>
                <p></p>
              </div>
            </div>
        </div>
    </div>
  )
}
