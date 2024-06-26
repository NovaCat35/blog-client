import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { EditorContext } from "../Pages/WritePage";
import "../../styles/Others.scss";

function SubmitBlog() {
	const [isPublish, setIsPublish] = useState(true);
	const { user, tokenActive } = useContext(AuthContext);
  const { title, readTime, tags, file, imgCreatorName, imgSrcName, content } = useContext(EditorContext);


	const handleSwitchToggle = () => {
		setIsPublish(!isPublish);
	};

	const handleSubmit = () => {
    // check userRole: (verify users and admin can post)
    if(user.admin_access && tokenActive) {
      console.log(title, readTime, tags, file, imgCreatorName, imgSrcName, content)
    } 
  };

	return (
		<div className="h-[500px] md:w-[48vw]">
			<p className="w-full bg-[#db117d] px-2 py-2 text-white">You have to be a verified user to submit a blog.</p>
			{/* <p className="w-full px-10 py-2 bg-[#f0c033] font-bold">This page is under construction ⚠️</p> */}

			<div className="publish-opts ml-8">
				<h3 className="mt-8 font-semibold">Publish status</h3>
				<p className="text-sm">Make your blog public to the world or hide it away for now until you're ready.</p>
				<div className="flex gap-2 items-center mt-2">
					<label className="switch">
						<input type="checkbox" checked={isPublish} onChange={handleSwitchToggle} />
						<div className="slider">
							<div className="circle">
								<svg className="cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.696 365.696" height="6" width="6">
									<g>
										<path fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"></path>
									</g>
								</svg>
								<svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="10" width="10">
									<g>
										<path fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
									</g>
								</svg>
							</div>
						</div>
					</label>
					<p className="text-[#00adb3] font-medium">{isPublish ? "Publish!" : "Blog will be hidden."}</p>
				</div>
			</div>

			<button className="ml-8 mt-8 border-2 px-8 py-2 rounded-full bg-white hover:bg-[#db117d] hover:text-white" onClick={handleSubmit}>SUBMIT</button>
		</div>
	);
}

export default SubmitBlog;
