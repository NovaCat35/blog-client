import Navbar from "../Navbar";
import Footer from "../Footer";

function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="p-10 flex-grow">
				<h1 className="text-4xl mb-5">About Me</h1>
				<p className="inline-block px-10 py-2 bg-[#f0c033] font-bold rounded">This page is under construction ⚠️</p>

				<div className="about-info mt-5">
					<p className="mb-2">
						Shucks howdy! My name is Robert, better known as <b>NovaCat35</b> on my{" "}
						<a className="text-[#d80a77] font-bold underline" href="https://github.com/NovaCat35" target="blank">
							Github
						</a>{" "}
						page.{" "}
					</p>
					<p className="mb-2">I created this website with one purpose in mind. It was, speaking short term wise, the goal to develop a grandioso fullstack site to finally complete that long anticipated desire of connecting the frontend with the backend. Yet, looking ahead as I soon reach the end of this project, I decided it's worth keeping to update. I envision transforming it into a vibrant space that combines my artistic expression with showcases of my various side projects. Who knows, maybe I can grow myself as I grow this site too.</p>
					<p className="mb-2">Thus, this journey of my blogs begins.</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default AboutPage;
