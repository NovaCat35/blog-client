import githubSvg from "../assets/github.svg";
import lighthouse from "../assets/lighthouse.png";

function Footer() {
	return (
		<footer className="">
			<div className="banner bg-[#8cbadb] w-full h-3 mt-3 "></div>
			<div className="bg-[#3b6175] text-white">
				<div className="footer-top flex">
					{/* Site Info */}
					<div className="pt-5 pb-8 px-4 w-full">
						<h1 className="text-2xl border-b-2 border-[#8cbadb] pb-2 mb-4">Wayfarer's Frontier</h1>
						<p>
							Heya, you reach the end of this page! I hope you enjoyed your time here. <br /> If you find my contents interesting, consider bookmarking this site or follow me on social media. <br /> <br />
							~Thank you very much, dear viewers!
						</p>
					</div>
					{/* Social Media */}
					<div className="bg-[#b1b63a] pt-5 pb-8 px-4">
						<img className="w-[250px]" src={lighthouse} alt="lighthouse" />
						{/* <div className="max-w-7xl mx-auto mt-8 flex flex-col items-center text-center">
							<a href="https://github.com/NovaCat35/shopping-cart" className="w-80 flex items-center justify-center space-x-2 rounded-md bg-gray-200 p-2">
								<img src={githubSvg} alt="github logo" className="h-8 w-auto transform hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
								<p className="text-gray-600">Developed by NovaCat35</p>
							</a>
							<div className="mt-4 text-gray-100">&copy; 2024 Wayfarer Frontier. All rights reserved.</div>
						</div> */}
					</div>
				</div>
				<div className="bottom-container bg-[#2c3e52] pt-4 pb-4 px-2">
					{/* Developer Info */}
					<div className="max-w-7xl mx-auto flex flex-col items-center text-center">
						<a href="https://github.com/NovaCat35/shopping-cart" className="w-[16rem] flex items-center justify-center space-x-2 rounded-md bg-gray-200 p-1">
							<img src={githubSvg} alt="github logo" className="h-7 w-auto transform hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
							<p className="text-gray-600">Developed by NovaCat35</p>
						</a>
						<div className="mt-3 text-gray-100">&copy; 2024 Wayfarer Frontier. All rights reserved.</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
