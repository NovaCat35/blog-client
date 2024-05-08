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
			<main className="px-10 py-5 flex-grow">
				{tokenActive ? (
					<div className="greeting-container flex flex-col justify-center items-center">
						<h1 className="text-4xl">Welcome, {user.username}!</h1>
						<img src={catBagImg} alt="cat laying down" className="max-w-xs mt-4 object-cover rounded-full" />
						<div className="info mt-4">
							<p className="mb-2">
								<span className="font-semibold">Email:</span> {user.email}
							</p>
							<p className="mb-2">
								<span className="font-semibold">Date Joined:</span> {formatDate(user.date_joined)}
							</p>
							<p className="mb-2">
								<span className="font-semibold">Role:</span> {user.admin_access ? "Member" : "Admin"}
							</p>
						</div>
					</div>
				) : (
					<div className="alert-container flex flex-col items-center justify-center">
						<p className="text-lg mb-4">Please login or sign up first.</p>
						<img src={catBagImg} alt="cat laying down" className="max-w-xs object-cover rounded-md" />
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default ProfilePage;
