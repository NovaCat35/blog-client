import { useState, useContext } from "react";
import { userContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import eyeIconImg from "../../assets/eye.svg";
import eyeOffIconImg from "../../assets/eye-off.svg";
import { v4 as uuidv4 } from "uuid";

function SignupPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const { setUser } = useContext(userContext);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "username") {
			setUsername(value);
		} else if (name === "password") {
			setPassword(value);
		} else if (name === "password_confirm") {
			setPasswordConfirm(value);
		} else if (name === "email") {
			setEmail(value);
		}
	};

	const handleTogglePassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	const handleTogglePasswordConfirm = () => {
		setShowPasswordConfirm((prevShowPassword) => !prevShowPassword);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newUser = {
			username,
			password,
			password_confirm: passwordConfirm,
			email,
		};

		try {
			const response = await fetch("http://localhost:3000/auth/signup", {
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
				setErrorMessages(errorData.errorMessages || ["Sign up failed."]);
				console.error("Sign up failed:", response.status, errorData.errorMessages);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setErrorMessages(["Internal Server Error"]);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow flex flex-col items-center justify-center px-10">
				<h1 className="text-xl text-center font-semibold mb-10">
					Welcome to the community, happy to have you aboard! <br /> Please follow our community{" "}
					<a className="underline underline-offset-4 text-[#e7175a]" href="">
						guidelines
					</a>{" "}
					here.
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col w-[470px] lg:w-[50vw] mb-10">
					<div className="form-opt flex flex-col">
						<label htmlFor="username">Username</label>
						<input type="text" name="username" onChange={handleChange} id="username" className="border border-gray-300 rounded px-3 py-2 mb-3" placeholder="John Cena" required />
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" onChange={handleChange} id="email" className="border border-gray-300 rounded px-3 py-2 mb-3" placeholder="johncena@gmail.com" required />
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="password">Password</label>
						<div className="password-container relative h-10 mb-5">
							<input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" required />
							<img onClick={handleTogglePassword} className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" src={showPassword ? eyeOffIconImg : eyeIconImg} alt="password eye-icon" />
						</div>
						<label htmlFor="password_confirm">Confirm Password</label>
						<div className="password-confirm-container relative h-10 mb-5">
							<input type={showPasswordConfirm ? "text" : "password"} id="password_confirm" name="password_confirm" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" required />
							<img onClick={handleTogglePasswordConfirm} className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" src={showPasswordConfirm ? eyeOffIconImg : eyeIconImg} alt="password eye-icon" />
						</div>
					</div>
					<button type="submit" className="bg-[#1fa1ba] text-white rounded px-4 py-2 duration-300 ease-in-out hover:bg-[#105580]">
						Sign up
					</button>
				</form>
				{errorMessages.length > 0 && (
					<ul className="text-red-500 font-semibold mb-5 text-center">
						{errorMessages.map((error) => (
							<li key={uuidv4()}>⚠️ {error}</li>
						))}
					</ul>
				)}
				<p className="font-bold mb-10">
					Have an account already?{" "}
					<Link to="/login" className="text-[#e7175a] mb-10">
						Log in
					</Link>
				</p>
			</main>
			<Footer />
		</div>
	);
}

export default SignupPage;
