import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import profileSvg from "../assets/profile.svg";
import writeSvg from "../assets/edit.svg";
import "../styles/Modal.scss";


function Modal() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate("/"); // return back to homepage
	};

	return (
		<div className="modal-container absolute w-[200px] top-[110px] right-[30px]">
			<div className="message-arrow top-[-12px] right-[30px]"></div>
			<div className="modal font-normal bg-[#ffffff]">
				<div className="username-container flex flex-col items-center bg-[#1ea0ba] w-full text-white py-2">
					<h2>{user.username}</h2>
				</div>
				<div className="options-container px-2 border-x-2 border-gray-300">
					<div className="options flex flex-col gap-2 border-b-2 border-gray-300 pt-3 pb-5">
						<Link to="/profile" className="modal-tab px-2 py-2 flex justify-start items-center gap-2 text-[#4a5366] hover:bg-gray-100 hover:text-[black]">
							<img className="icon w-10" src={profileSvg} alt="profile icon" />
							<p>Profile</p>
						</Link>
						<Link to="/editor" className="modal-tab px-2 py-2 flex justify-start items-center gap-2 text-[#4a5366] hover:bg-gray-100 hover:text-[black]">
							<img className="icon w-10" src={writeSvg} alt="write icon" />
							<p>Write</p>
						</Link>
					</div>
				</div>
				<div className="logout-container border-x-2 border-b-2 border-gray-300 w-full px-2 pb-2">
					<button onClick={logout} className="font-semibold mt-2 py-1 w-full rounded text-[#e84267] transition duration-300 ease-in-out hover:bg-[#e84267] hover:text-white">
						Log out
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
