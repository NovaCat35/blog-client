import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import eyeIconImg from "../../assets/eye.svg";
import eyeOffIconImg from "../../assets/eye-off.svg";
import "../../styles/Auth.scss";
import { v4 as uuidv4 } from "uuid";

interface errorObj {
	errorType: string;
	errorMsg: string;
}

function SignupPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [errorMessages, setErrorMessages] = useState<errorObj[]>([]);
	const navigate = useNavigate();

	// Ref here used to manipulate the shake animation for error messages
	const usernameRef = useRef<HTMLDivElement>(null);
	const emailRef = useRef<HTMLDivElement>(null);
	const passwordRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLLIElement>(null);

	function getErrorMsg(errorType: string) {
		return errorMessages.find((errorObj) => errorObj.errorType === errorType)?.errorMsg || "";
	}

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
			const response = await fetch("https://wayfarers-frontier-api.fly.dev/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
			// Response good, save return info of user and token within context and local storage, respectively
			if (response.ok) {
				const { token, user, expiresAt } = await response.json();
				localStorage.setItem("jwt_token", token);
				localStorage.setItem("jwt_expiration", expiresAt);
				localStorage.setItem("user", JSON.stringify(user));

				navigate("/");
			} else {
				const errorData = await response.json();
				setErrorMessages(errorData.errorMessages || ["Sign up failed."]);
				console.error("Sign up failed:", response.status, errorData.errorMessages);
				usernameRef.current?.classList.add("active");
				emailRef.current?.classList.add("active");
				passwordRef.current?.classList.add("active");
				errorRef.current?.classList.add("active");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setErrorMessages([{ errorType: "others", errorMsg: "Internal Server Error" }]);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow flex flex-col items-center justify-center px-10">
				<h1 className="text-xl text-center font-semibold mb-10">
					Yargh, welcome aboard to our community! <br /> Please follow our community{" "}
					<a className="underline underline-offset-4 text-[#e7175a]" href="">
						guidelines
					</a>{" "}
					here.
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col w-[80vw] md:w-[470px] lg:w-[50vw] mb-5">
					<div className="form-opt flex flex-col">
						<label htmlFor="username">Username</label>
						<div className="username-container relative h-10 mb-5">
							<input type="text" name="username" onChange={handleChange} id="username" className={`border-2 w-full ${getErrorMsg("username") ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 mb-3`} placeholder="Jack Sparrow" maxLength={50} required />
							<span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
								{username.length}/{50}
							</span>
						</div>
						<p ref={usernameRef} className="error-msg" onAnimationEnd={() => usernameRef.current?.classList.remove("active")}>
							{getErrorMsg("username")}
						</p>
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" onChange={handleChange} id="email" className={`border-2 ${getErrorMsg("email") ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 mb-3`} placeholder="blackpearl32@gmail.com" required />
						<p ref={emailRef} className="error-msg" onAnimationEnd={() => emailRef.current?.classList.remove("active")}>
							{getErrorMsg("email")}
						</p>
					</div>
					<div className="form-opt flex flex-col">
						<label htmlFor="password">Password</label>
						<div className="password-container relative h-10 mb-5">
							<input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChange} className="border-2 border-gray-300 rounded px-3 py-2 w-full" required />
							<img onClick={handleTogglePassword} className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" src={showPassword ? eyeOffIconImg : eyeIconImg} alt="password eye-icon" />
						</div>
						<label htmlFor="password_confirm">Confirm Password</label>
						<div className="password-confirm-container relative h-10 mb-5">
							<input type={showPasswordConfirm ? "text" : "password"} id="password_confirm" name="password_confirm" onChange={handleChange} className={`border-2 ${getErrorMsg("password") ? "border-red-500" : "border-gray-300"} rounded px-3 py-2 w-full`} required />
							<img onClick={handleTogglePasswordConfirm} className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" src={showPasswordConfirm ? eyeOffIconImg : eyeIconImg} alt="password eye-icon" />
						</div>
						<p ref={passwordRef} className="error-msg" onAnimationEnd={() => passwordRef.current?.classList.remove("active")}>
							{getErrorMsg("password")}
						</p>
					</div>
					<button type="submit" className="bg-[#1fa1ba] text-white rounded px-4 py-2 duration-300 ease-in-out hover:bg-[#105580]">
						Sign up
					</button>
				</form>
				{errorMessages.filter((obj) => obj.errorType == "other").length > 0 && (
					<ul>
						{errorMessages.map((errorObj) =>
							errorObj.errorType == "other" ? (
								<li key={uuidv4()} ref={errorRef} className=".error-other-msg bg-red-500 py-1 px-5 rounded-md text-white font-semibold mb-5 text-center" onAnimationEnd={() => errorRef.current?.classList.remove("active")}>
									⚠️ {errorObj.errorMsg}
								</li>
							) : (
								<></>
							)
						)}
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
