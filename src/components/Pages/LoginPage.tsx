import { useState, useContext } from "react";
import { userContext } from "../../contexts/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(userContext);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "username") {
			setUsername(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newUser = {
			username,
			password,
		};

		try {
			const response = await fetch("/auth/login", {
				method: "POST",
				body: JSON.stringify(newUser),
			});

			// save the JWT token locally and the user in the context so we can access protected links later on
			if (response.ok) {
				const { token, user } = await response.json();
				localStorage.setItem("jwt_token", token);

				console.log(`TOKEN: ${token}`);
				console.log(`huzzah: ${user}`);

				setUser(user);
				setUsername(""); // Clear the form inputs
				setPassword("");
			} else {
				console.error("Login failed:", response.status);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
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
						<input type="text" name="username" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mb-3" placeholder="John Cena" />
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 mb-3" />
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
