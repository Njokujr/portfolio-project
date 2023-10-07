import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/TopBar";
import Footer from "../../components/footer/Footer";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css"

export default function Single({user}) {
   return ( 
     <>
     <Topbar/>		
			<div className="container">
				<div className="singlePost">
					<SinglePost user={user} />		
					<Sidebar />			
				</div>
			</div>
	<Footer/>
    </>
	);
};
