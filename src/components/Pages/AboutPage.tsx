import Navbar from "../Navbar";
import Footer from "../Footer";
import defaultImg from "../../assets/cat-sail.jpeg";
import "../../styles/Fonts.scss";

function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="pt-5 pb-10 md:px-[7rem] flex-grow">
				<h1 className="text-5xl font-bold mb-10 mx-5 text-[#233742]">About Me</h1>
				<div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-3 md:gap-10">
					<div className="relative w-[100vw] md:w-[730px] h-[500px]">
						<div className="absolute hidden md:block w-full h-[95%] bg-[#e0afaf] transform rotate-3 shadow-md"></div>
						<img className="absolute w-full h-full object-cover transform md:-rotate-2" src={defaultImg} alt="star fall svg" />
					</div>
					<div className="description md:max-w-[50vw] mt-5 md:mt-0 px-[30px] md:px-[10px] text-lg text-[#233742]">
						<p className="text-2xl font-bold mb-2">Shucks howdy!</p>
						<p className="mb-5">
							My name is Robert, better known as <b>NovaCat35</b> on my{" "}
							<a className="text-[#d80a77] font-bold underline-offset-2 underline" href="https://github.com/NovaCat35" target="blank">
								Github
							</a>{" "}
							page.{" "}
						</p>
						<p className="mb-5">This website was created in part to showcase some crucial skills I have learned so far from the Odin Project's full stack path . The reason I named it "Wayfarer's Frontier" was partly because of my metaphorical idea of life. Where one's out lost at sea, with occasions such as a bright glimmer of a beacon light from the distant shoreline. </p>
						<p className="mb-5">As I approach the end of this project, I'm quite proud of what I created and will likely update from time to time. Perhaps I'll end up talking to myself in the end, but hey, it's cool to just journal some thoughts! Anyway, I'll try to fill this space with whatever comes to mind and showcase some of my various side projects too. Who knows, maybe I can grow myself as I grow this site and make someone's day while I'm at it.</p>
						<p className="text-2xl font-bold mb-2">Viewers Like You.</p>
						<p className="mb-5">
							As the PBS shows always ends it, This site was made possible by viewers like you. <span className="text-[#e7175a] font-bold">Thank you!</span>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default AboutPage;
