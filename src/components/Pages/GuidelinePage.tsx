import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import errorImg from "../../assets/dungeon-meshi-knights.jpeg";

function GuidelinePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow overflow-hidden w-[100vw]">
				<div className="banner bg-[#4cc5e7] w-full h-5 border-b-4 border-[#105581]"></div>
				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-[#d80a77] mt-8 mb-5">GUIDELINES</h1>
					<div className="w-[600px] h-[350px] overflow-hidden rounded-lg border-[#1fa1ba] border-8">
						<img src={errorImg} alt="Dog wearing clothes" className="w-full h-full object-cover" />
					</div>
					<ul className="font-bold flex flex-col gap-3">
						<li className="text-lg text-gray-700 mt-4 max-w-md text-center">1) Be polite, professionals have standards.</li>
						<li className="text-lg text-gray-700 max-w-md text-center">2) Be curious, like a hungry dungeon explorer.</li>
						<li className="text-lg text-gray-700 max-w-md text-center">3) Be good.</li>
					</ul>
					<div className="flex flex-col text-center md:flex-row gap-5 md:gap-10 mt-5 mb-5">
						<Link to="/login" className="border-[#d80a77] shadow-lg text-xl border-4 rounded-md px-10 py-2 text-[#d80a77] hover:text-[#1fa1ba] hover:border-[#1fa1ba] hover:shadow-cyan-500/50">
							Accept
						</Link>
						<Link to="/blogs" className="border-[#d80a77] shadow-lg text-xl border-4 rounded-md px-10 py-2 text-[#d80a77] hover:text-[#1fa1ba] hover:border-[#1fa1ba] hover:shadow-cyan-500/50">
							Blogs
						</Link>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default GuidelinePage;
