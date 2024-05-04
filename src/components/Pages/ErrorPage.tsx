import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function BlogPage() {   
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-20 mt-10">
            <h1>Error</h1>
            <Link to="/"></Link>
         </main>
			<Footer />
		</div>
	);
}

export default BlogPage;
