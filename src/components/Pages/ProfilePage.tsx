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
						<h1 className="text-5xl text-center">Welcome, {user.username}</h1>
						<div className="flex flex-col md:flex-row justify-center items-center md:gap-5 mt-2">
							<img className="max-w-xs mt-8 object-cover rounded-lg" src={user.profile_img !== 'default' ? user.profile_img : catBagImg} alt="cat laying down" />
							<div className="info mt-6 text-lg">
								<div className="mb-2">
									<span className="font-semibold">Email:</span> {user.email}
								</div>
								<div className="mb-2">
									<span className="font-semibold">Date Joined:</span> {formatDate(user.date_joined)}
								</div>
								<div className="mb-2 flex gap-2 font-semibold">
									<span>Role:</span> <p className="text-[#d80a77]">{user.admin_access ? "Admin" : "Member"}</p>
								</div>
								{user.admin_access && <button className="bg-[#4e92ba] text-[#e2f1f4] border-2 border-[#04afe6] mt-2 px-4 py-1 rounded-md hover:bg-[#566a84] hover:text-white hover:border-[#dbe4e9]" type="button">Manage Blogs</button>}
							</div>
						</div>
					</div>
				) : (
					<div className="alert-container flex flex-col justify-center items-center">
						<p className="text-lg mb-4 font-semibold">Please login or sign up first.</p>
						<img src={catBagImg} alt="cat laying down" className="max-w-xs object-cover rounded-md" />
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default ProfilePage;
