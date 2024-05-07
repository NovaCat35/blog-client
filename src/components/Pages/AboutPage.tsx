import Navbar from "../Navbar";
import Footer from "../Footer";

function AboutPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="p-10 flex-grow">
				<h1 className="text-4xl mb-5">About Me</h1>
				<p>This page is under construction ⚠️</p>
			</main>
			<Footer />
		</div>
	);
}

export default AboutPage;
