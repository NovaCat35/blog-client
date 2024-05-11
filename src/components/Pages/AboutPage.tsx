import Navbar from "../Navbar";
import Footer from "../Footer";

function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="py-10 px-[7rem] flex-grow">
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
					<p className="mb-5">I created this website originally with one purpose in mind. It was the goal of developing a grandioso full stack site to finally complete that long anticipated desire of connecting the frontend with the backend. It's like the feeling of seeing a beacon light from a distant lighthouse after being out at sea for so long, a magnum opus if you will. I guess to say so much has happened since I begin my debut into the development world. I suppose as I soon reach the end of this project, it may be worth while keeping it updated with some thoughts and projects I'm working on. It may not gather that much view, maybe I'll end up talking to myself in the end ... But hey, that's cool too. Anyway, I will try to fill this vibrant space with whatever artistic expression I have and showcases of my various side projects. Who knows, maybe I can grow myself as I grow this site too.</p>
					<p className="mb-5">As the PBS shows always ends it, This site was made possible by viewers like you. Thank you!</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default AboutPage;
