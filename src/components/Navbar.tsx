import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavbarContext } from "../contexts/NavContext";
import { Link } from "react-router-dom";
import logo from "../assets/cat-sail.jpeg";
import "../styles/Navbar.scss";
import defaultPfp from "../assets/cat-bag.jpg";
import Modal from "./Modal";

function Navbar() {
	const [showNav, setShowNav] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false); // for changing color of the nav background to be blue whenever we're at the start before threshold
	const { user, tokenActive } = useContext(AuthContext); // we have a verified user (e.g. token is active), set a route to profile link instead of standard login/signup btn
	const { activeLink } = useContext(NavbarContext);
	const modalNavRef = useRef<HTMLDivElement>(null);

	/**
	 * SCROLL CONTROL: disappear when user scrolls down and reappear when scroll up
	 */
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
				setIsScrolled(currentScrollY > scrollThreshold);
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

	/**
	 * MODAL controls below:
	 * 1) Direct click on img: toggle modal
	 * 2) Click outside of modal -> close modal
	 */
	const toggleModal = () => {
		if (showModal) {
			setShowModal(false);
		} else {
			setShowModal(true);
		}
	};
	useEffect(() => {
		// Click outside pfp-nav container and it's children (modal) will make modal not be shown
		const handleClickOutside = (event: MouseEvent) => {
			if (modalNavRef.current && !modalNavRef.current.contains(event.target as Node)) {
				setShowModal(false);
			}
		};

		window.addEventListener("mousedown", handleClickOutside);
		return () => {
			window.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowModal]);

	/**
	 * WaveSVG controller:
	 * Changes the size of the wave svg to be bigger for mobile screens
	 * (since original svg resizes to small as you shrink page)
	 */
	useEffect(() => {
		const updateViewBox = () => {
			const svg = document.querySelector(".page-wave");
			if (svg) {
				if (window.innerWidth >= 600) {
					svg.setAttribute("viewBox", "0 130 1440 200");
				} else {
					svg.setAttribute("viewBox", "0 0 950 280");
				}
			}
		};

		updateViewBox();
		window.addEventListener("resize", updateViewBox);

		return () => {
			window.removeEventListener("resize", updateViewBox);
		};
	}, []);

	return (
		<>
			{/* <div className='page_stripe'></div> */}
			<nav className={`flex px-10 pt-7 pb-3 ${isScrolled ? "bg-white bg-opacity-90" : ""} sticky top-0 z-10 transition-transform duration-300 transform ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
				<div className="logo-container w-[70px] h-[70px] flex items-center justify-center overflow-hidden rounded-full">
					<Link to="/">
						<img className="logo w-[250px] object-cover mt-4" src={logo} alt="site logo" />
					</Link>
				</div>

				<div className="right-side flex gap-8 items-center text-[#223742] text-lg font-bold">
					<Link to="/" className={`link ${activeLink == "/" ? "activeLink" : ""} underline-offset-4 hover:underline`}>
						Home
					</Link>
					<Link to="/blogs" className={`link ${activeLink == "/blogs" ? "activeLink" : ""} underline-offset-4 hover:underline`}>
						Blogs
					</Link>
					{/* <Link to="/projects">Projects</Link> */}
					<Link to="/about" className={`link ${activeLink == "/about" ? "activeLink" : ""} underline-offset-4 hover:underline`}>
						About
					</Link>
					{tokenActive ? (
						<div ref={modalNavRef} onClick={toggleModal} className="pfp-modal-container cursor-pointer w-[60px] h-[60px] overflow-hidden rounded-full border-4">
							<img className="w-full h-full object-cover " src={user.profile_img !== "default" ? user.profile_img : defaultPfp} alt="pfp" />
							{showModal && <Modal />}
						</div>
					) : (
						<Link to="/login" className="border border-white px-5 py-1.5 rounded-md bg-[#1ca1ba] text-white hover:bg-[#718fba]">
							Login
						</Link>
					)}
				</div>
			</nav>
			<svg className="page-wave absolute -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 130 1440 200">
				<defs>
					<linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" style={{ stopColor: "#1ca1ba", stopOpacity: 1 }} />
						<stop offset="5%" style={{ stopColor: "#1ca1ba", stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: "#90d5d5", stopOpacity: 1 }} />
					</linearGradient>
				</defs>
				<path fill="url(#waveGradient)" fillOpacity="1" d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
			</svg>
		</>
	);
}

export default Navbar;
