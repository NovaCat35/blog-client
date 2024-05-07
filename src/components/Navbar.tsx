import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/cat-sail.jpeg";
import "../styles/Navbar.scss";
import pfp from "../assets/cat-bag.jpg";

function Navbar() {
	const [show, setShow] = useState(true);
	const [profileActive, setProfileActive] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const { tokenActive } = useContext(AuthContext);

	useEffect(() => {
		// we have a verified user, set a route to profile link instead of standard login/signup btn
		if (tokenActive) {
			setProfileActive(true);
		}
	}, [tokenActive]);

	useEffect(() => {
		const controlNavbar = () => {
			if (typeof window !== "undefined") {
				const currentScrollY = window.scrollY;
				const scrollThreshold = 30;
				if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
					// we can't hide navbar if modal is active
					// if scrolling down, hide the navbar
					setShow(false);
				} else {
					// if scrolling up, show the navbar
					setShow(true);
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

	return (
		<nav className={`flex justify-between px-10 py-5 bg-white bg-opacity-80 sticky top-0 z-10 transition-transform duration-300 transform ${show ? "translate-y-0" : "-translate-y-full"}`}>
			<div className="w-[70px] h-[70px] flex items-center justify-center overflow-hidden rounded-full">
				<Link to="/">
					<img className="logo w-[250px] object-cover mt-4" src={logo} alt="site logo" />
				</Link>
			</div>

			<div className="right-side flex gap-8 items-center text-[#223742] text-lg font-bold">
				<Link to="/">Home</Link>
				<Link to="/blogs">Blogs</Link>
				{/* <Link to="/projects">Projects</Link> */}
				<Link to="/about">About</Link>
				{profileActive ? (
					<Link to="/profile" className="Profile w-[60px] h-[60px] overflow-hidden rounded-full border-4 border-[#1ca1ba]">
						<img className="w-full h-full object-cover " src={pfp} alt="pfp" />
					</Link>
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
