import Navbar from "../Navbar";
import Footer from "../Footer";

function LoginPage() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow flex flex-col items-center justify-center">
				<h1 className="text-xl font-semibold mb-10">
					Welcome to the community, we hope you can enjoy the stay. Please follow our community{" "}
					<a className="underline underline-offset-4 text-[#e7175a]" href="#">
						guidelines
					</a>{" "}
					here.
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col w-[470px] mb-10">
					<div className="form-opt flex flex-col">
						<label htmlFor="username">Username</label>
						<input type="text" name="username" className="border border-gray-300 rounded px-3 py-2 mb-3" placeholder="John Cena" />
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" className="border border-gray-300 rounded px-3 py-2 mb-3" />
					</div>
					<button type="submit" className="bg-[#1fa1ba] text-white rounded px-4 py-2 hover:bg-[#105580]">
						Login
					</button>
				</form>
			</main>
			<Footer />
		</div>
	);
}

export default LoginPage;
