import { Link } from "react-router-dom";
import logo from "../assets/cat-sail.jpeg";
import  "../styles/Navbar.scss";

function Navbar() {
	return (
		<nav className="flex justify-between px-10 py-5">
			<div className="w-[70px] h-[70px] flex items-center justify-center overflow-hidden rounded-full">
				<Link to="/">
					<img className="logo w-[250px] object-cover mt-4" src={logo} alt="site logo" />
				</Link>
			</div>

			<div className="right-side flex gap-8 items-center">
				<Link to="/">Home</Link>
				<Link to="/blogs">Blogs</Link>
				{/* <Link to="/projects">Projects</Link> */}
				<Link to="/about">About</Link>
				<Link to="/login" className="border border-white px-5 py-1.5 rounded-md bg-[#1ca1ba] text-white hover:bg-[#718fba]">
					Login
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
