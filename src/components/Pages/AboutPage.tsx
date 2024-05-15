import Navbar from "../Navbar";
import Footer from "../Footer";

function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="py-10 px-[30px] md:px-[7rem] flex-grow">
				<h1 className="text-4xl mb-5">About Me</h1>
				<p className="inline-block px-10 py-2 bg-[#f0c033] font-bold rounded">This page is under construction ⚠️</p>

				<div className="about-info mt-5 text-lg text-[#233742]">
					<p className="mb-5">
						Shucks howdy! My name is Robert, better known as <b>NovaCat35</b> on my{" "}
						<a className="text-[#d80a77] font-bold underline" href="https://github.com/NovaCat35" target="blank">
							Github
						</a>{" "}
						page.{" "}
					</p>
					<p className="mb-5">This website was created in part to showcase a grandioso full stack blog page and utilizing crucial skills in full stack development . The reason I named it "Wayfarer's Frontier" was partly because of my metaphorical idea of life. Where one's out lost at sea, with occasions such as a bright glimmer of a beacon light from the distant shoreline. </p>
					<p className="mb-5">While this is now far from my magnum opus, this project is something i'm proud of and will most likely be updated from time to time with some of my thoughts and projects I'm working on. It may not gather that much view, maybe I'll end up talking to myself in the end ... But hey, that's cool too. Anyway, I will try to fill this vibrant space with whatever artistic expression I have and showcases of my various side projects. Who knows, maybe I can grow myself as I grow this site too.</p>
					<p className="mb-5">As the PBS shows always ends it, This site was made possible by viewers like you. Thank you!</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default AboutPage;
