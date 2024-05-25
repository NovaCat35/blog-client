import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import errorImg from "../../assets/dungeon-meshi.png";

function ErrorPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow overflow-hidden w-[100vw]">
				<div className="banner bg-[#8dbadb] w-full h-5 border-b-4 border-[#105581]"></div>
				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-[#d80a77] mt-8 mb-5">404: YOLO!</h1>
					<div className="w-[600px] h-[350px] overflow-hidden rounded-lg border-[#1fa1ba] border-8">
						<img src={errorImg} alt="Dog wearing clothes" className="w-full h-full object-cover" />
					</div>
					<p className="text-lg text-gray-700 mt-4 max-w-md text-center">Aw Shucks, looks like what you're looking for doesn't exist. Try one of the links below!</p>
					<div className="flex gap-10 mt-5 mb-5">
						<Link to="/" className="border-[#d80a77] shadow-lg  text-xl border-4 rounded-md px-10 py-2 text-[#d80a77] hover:text-[#1fa1ba] hover:border-[#1fa1ba] hover:shadow-cyan-500/50">
							Home
						</Link>
						<Link to="/blogs" className="border-[#d80a77] shadow-lg  text-xl border-4 rounded-md px-10 py-2 text-[#d80a77] hover:text-[#1fa1ba] hover:border-[#1fa1ba] hover:shadow-cyan-500/50">
							Blogs
						</Link>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default ErrorPage;
