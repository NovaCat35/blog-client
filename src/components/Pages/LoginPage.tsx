import { useState, useContext } from "react";
import { userContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import eyeIconImg from "../../assets/eye.svg";
import eyeOffIconImg from "../../assets/eye-off.svg";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { setUser } = useContext(userContext);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "username") {
			setUsername(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const handleTogglePassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newUser = {
			username,
			password,
		};

		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});

			if (response.ok) {
				const { token, user } = await response.json();
				localStorage.setItem("jwt_token", token);

				setUser(user);
			} else {
				const errorData = await response.json();
				setErrorMessage(errorData.error || "Login failed.");
				console.error("Login failed:", response.status);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setErrorMessage("Internal Server Error");
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow flex flex-col items-center justify-center px-10">
				<h1 className="text-xl text-center font-semibold mb-10">
					AHOY MATEY, welcome back! <br /> Please continue to follow our community{" "}
					<a className="underline underline-offset-4 text-[#e7175a]" href="">
						guidelines
					</a>
					, yargh!!
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col w-[470px] lg:w-[50vw] mb-10">
					<div className="form-opt flex flex-col">
						<label htmlFor="username">Username</label>
						<input type="text" name="username" onChange={handleChange} id="username" className="border-2 border-gray-300 rounded px-3 py-2 mb-3" placeholder="John Cena" required />
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="password">Password</label>
						<div className="password-container relative h-10 mb-5">
							<input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChange} className="border-2 border-gray-300 rounded px-3 py-2 w-full" required />
							<img onClick={handleTogglePassword} className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" src={showPassword ? eyeOffIconImg : eyeIconImg} alt="password eye-icon" />
						</div>
					</div>
					<button type="submit" className="bg-[#1fa1ba] text-white rounded px-4 py-2 duration-300 ease-in-out hover:bg-[#105580]">
						Login
					</button>
				</form>
				{errorMessage && <div className="error-other-msg bg-red-500 py-1 px-5 rounded-md text-white font-semibold mb-5">⚠️ {errorMessage}</div>}
				<p className="font-bold mb-10">
					Don't have an account?{" "}
					<Link to="/signup" className="text-[#e7175a]">
						Sign up
					</Link>
				</p>
			</main>
			<Footer />
		</div>
	);
}

export default LoginPage;
