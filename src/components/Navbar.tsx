import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cat-sail.jpeg";

function Navbar() {
	return (
		<nav className="flex justify-between px-10 py-5">
			<div className="w-[70px] h-[70px] flex items-center justify-center overflow-hidden rounded-full">
				<img className="w-[250px] object-cover mt-4" src={logo} alt="site logo" />
			</div>

			<div className="right-side flex gap-8 items-center">
				<Link to="/">Home</Link>
				<Link to="/blogs">Blogs</Link>
				{/* <Link to="/projects">Projects</Link> */}
				<Link to="/about">About</Link>
			</div>
		</nav>
	);
}

export default Navbar;
