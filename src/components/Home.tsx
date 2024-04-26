import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-10">
				<h1 className="text-5xl">Wayfarer's Frontier</h1>
			</main>
			<Footer />
		</div>
	);
}

export default Home;
