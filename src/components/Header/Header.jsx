import { useRef , useState , useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Header/Header.css";
import { VscAccount } from "react-icons/vsc";
import {  onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useHistory, useNavigate  , Navigate } from "react-router-dom";


const Header = ( props ) => {

    const navRef = useRef();
	const navigate = useNavigate;

	const [authUser , setAuthuser] = useState(null);
	useEffect(() => {
		const listen = onAuthStateChanged(auth,(user) =>{
			if(user){
				setAuthuser(user);
			}else{
				setAuthuser(null);
			}
		});
	},[]);


	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
	const handleLogin = () =>{
		 return navigate("/login");

	}
	const handleLogout=() =>{

		signOut(auth).then(()=>{
			console.log("Sign out done")
		}).catch(error => console.log(error));
		navigate("/login");


		
	}



	return (
		<header>
			<h3>AADI</h3>
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">My work</a>
				<a href="/#">Appoiments</a>
				<a href="/#">Calender</a>
				{
					authUser ? (<>
					
					<div className="name"> <VscAccount className="vs"/>   Dr {props.name}</div>
					<button className="log" onClick={handleLogout}>Logout</button>
					</>) : <button className="log" onClick={handleLogin} >LogIn</button>
				}
				
				{/* <a  className="name" href="/#">Dr {props.name}</a> */}
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button> 
				
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Header