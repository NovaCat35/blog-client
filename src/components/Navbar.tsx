import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/cat-sail.jpeg";
import "../styles/Navbar.scss";
import pfp from "../assets/cat-bag.jpg";
import Modal from "./Modal";

function Navbar() {
	const [showNav, setShowNav] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const { tokenActive } = useContext(AuthContext); // we have a verified user (e.g. token is active), set a route to profile link instead of standard login/signup btn
	const location = useLocation(); // gets current location

	// State to track the active link
	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		const controlNavbar = () => {
			if (typeof window !== "undefined") {
				const currentScrollY = window.scrollY;
				const scrollThreshold = 30;
				if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
					// we can't hide navbar if modal is active
					// if scrolling down, hide the navbar
					setShowNav(false);
				} else {
					// if scrolling up, show the navbar
					setShowNav(true);
				}
				// remember the current page location for the next move
				setLastScrollY(window.scrollY);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);

			// cleanup function
			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	useEffect(() => {
		// Set the active link based on the current pathname
		setActiveLink(location.pathname);
	}, [location.pathname]);

	const toggleModal = () => {
		if (showModal) {
			setShowModal(false);
		} else {
			setShowModal(true);
		}
	};

	return (
		<nav className={`flex justify-between px-10 py-7 bg-white bg-opacity-90 sticky top-0 z-10 transition-transform duration-300 transform ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
			<div className="w-[70px] h-[70px] flex items-center justify-center overflow-hidden rounded-full">
				<Link to="/">
					<img className="logo w-[250px] object-cover mt-4" src={logo} alt="site logo" />
				</Link>
			</div>

			<div className="right-side flex gap-8 items-center text-[#223742] text-lg font-bold">
				<Link to="/" className={`${activeLink == "/" ? "activeLink" : ""} underline-offset-4 hover:underline`}>
					Home
				</Link>
				<Link to="/blogs" className={`${activeLink == "/blogs" ? "activeLink" : ""} underline-offset-4 hover:underline`}>
					Blogs
				</Link>
				{/* <Link to="/projects">Projects</Link> */}
				<Link to="/about" className={`${activeLink == "/about" ? "activeLink" : ""} underline-offset-4 hover:underline`}>
					About
				</Link>
				{tokenActive ? (
					<div onClick={toggleModal} className="Profile cursor-pointer w-[60px] h-[60px] overflow-hidden rounded-full border-4 border-[#1ca1ba]">
						<img className="w-full h-full object-cover " src={pfp} alt="pfp" />
						{showModal && <Modal setShowModal={setShowModal} />}
					</div>
				) : (
					<Link to="/login" className="border border-white px-5 py-1.5 rounded-md bg-[#1ca1ba] text-white hover:bg-[#718fba]">
						Login
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
