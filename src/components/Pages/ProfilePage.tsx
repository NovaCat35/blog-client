import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import formatDate from "../../functions/DateFormatter";
import catBagImg from "../../assets/cat-bag.jpg";

function ProfilePage() {
	const { user, tokenActive } = useContext(AuthContext);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="px-10 py-5 flex-grow flex flex-col justify-center">
				{tokenActive ? (
					<div className="greeting-container flex flex-col justify-center items-center">
						<h1 className="text-5xl text-center">Hi, {user.username}!</h1>
						<img className="max-w-xs mt-8 object-cover rounded-lg" src={catBagImg} alt="cat laying down" />
						<div className="info mt-6">
							<div className="mb-2">
								<span className="font-semibold">Email:</span> {user.email}
							</div>
							<div className="mb-2">
								<span className="font-semibold">Date Joined:</span> {formatDate(user.date_joined)}
							</div>
							<div className="mb-2 flex gap-2 font-semibold">
								<span>Role:</span> <p className="text-[#d80a77]">{user.admin_access ? "Member" : "Admin"}</p>
							</div>
						</div>
					</div>
				) : (
					<div className="alert-container flex flex-col justify-center items-center">
						<p className="text-lg mb-4">Please login or sign up first.</p>
						<img src={catBagImg} alt="cat laying down" className="max-w-xs object-cover rounded-md" />
					</div>
				)}

				<p className="inline-block mt-5 px-10 py-2 bg-[#f0c033] font-bold rounded text-center">This page is under construction ⚠️</p>
			</main>
			<Footer />
		</div>
	);
}

export default ProfilePage;
