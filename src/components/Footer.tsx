import githubSvg from "../assets/github.svg";
import lighthouse from "../assets/lighthouse.png";
import "../styles/Footer.scss";

function Footer() {
	return (
		<footer className="">
			<div className="banner bg-[#8cbadb] w-full h-3 mt-3 "></div>
			<div className="bg-[#3b6175] text-white">
				<div className="footer-top flex">
					{/* Site Info */}
					<div className="footer-text-info pt-5 pb-8 px-8 w-full">
						<h1 className="text-2xl border-b-2 border-[#8cbadb] pb-2 mb-4">Wayfarer's Frontier</h1>
						<p>
							Woah, you reach the end of this page! Unlike this footer we can't always know where our journey will end so pace yourself and keep at it! Looking forward to seeing how you will grow. Ganbatte!
							<br /> <br />
							If you find my contents interesting, consider bookmarking this site.
							<br />
							~Thank you very much, dear viewers.
						</p>
					</div>
					{/* Social Media */}
					<div className="img-container flex justify-center items-center pt-5 pb-8 px-4">
						<img className=" md:w-full md:max-h-[250px]" src={lighthouse} alt="lighthouse" />
					</div>
				</div>
				<div className="bottom-container bg-[#2c3e52] pt-5 pb-4 px-2">
					{/* Developer Info */}
					<div className="max-w-7xl mx-auto flex flex-col items-center text-center">
						<a href="https://github.com/NovaCat35/blog-client" className="w-[16.3rem] flex items-center justify-center space-x-2 rounded-md bg-gray-200 p-1 pr-3" target="blank">
							<img src={githubSvg} alt="github logo" className="h-7 w-auto transform transition-transform duration-700 ease-in-out hover:rotate-[360deg]" />
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
