import { useContext, useState, useEffect, ChangeEvent, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BlogContext, Comment, Blog } from "../../contexts/BlogContext";
import { Link } from "react-router-dom";
import formatDate from "../../functions/DateFormatter";
import defaultImg from "../../assets/default.jpeg";
import seagullImg from "../../assets/seagull3.png";
import dotsSvg from "../../assets/dots-horizontal.svg";
import CommentModal from "./CommentModal";
import CommentLikes from "./CommentLikes";
import CommentReplies from "./CommentReplies";
import EditForm from "./Forms/EditForm";
import CommentForm from "./Forms/CommentForm";
import "../../styles/Comment.scss";

interface CommentSectionProps {
	blog: Blog | undefined;
	blogId: string | undefined;
}

function CommentSection({ blog, blogId }: CommentSectionProps) {
	const { user, tokenActive } = useContext(AuthContext);
	const { fetchComments } = useContext(BlogContext);
	const [comments, setComments] = useState<Comment[]>([]);
	const [editActive, setEditActive] = useState(false);
	const [editCommentText, setEditCommentText] = useState("");
	const [commentText, setCommentText] = useState("");
	const moreOptionsContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

	/* we keep a separate activeId for edit since we want to close(or make null) the modal when editing */
	const [activeEditCommentId, setActiveEditCommentId] = useState<string | null>(null);
	const [activeModalCommentId, setActiveModalCommentId] = useState<string | null>(null);


	// LOADING/FETCHING up comments for current blog
	useEffect(() => {
		if (blog && blogId) {
			const fetchData = async () => {
				const commentList = await fetchComments(blogId);
				setComments(commentList);
			};
			fetchData();
		}
	}, [blog, fetchComments, blogId]);

	const refreshComments = async () => {
		if (blogId) {
			const updatedComments = await fetchComments(blogId);
			setComments(updatedComments);
			setCommentText(""); // Clear the comment textarea
		}
	};

	// Opening up edit
	const handleEditComment = (comment: Comment) => {
		setEditActive(true);
		setEditCommentText(comment.text);
		setActiveEditCommentId(activeModalCommentId); // makes current editorId same as current commentId (so we can close the modal but keep the comment's id)
		setActiveModalCommentId(null); // close modal
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// Get the JWT token from localStorage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}

			// Post new comment to this blog
			const response = await fetch("https://wayfarers-frontier-api.fly.dev/comments", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					blog_post_id: blogId,
					comment: commentText,
				}),
			});

			if (response.ok) {
				refreshComments();
				const data = await response.json();
				console.log(data.message);
			} else {
				const errorMessage = await response.text();
				console.error("Failed to create comment:", response.status, errorMessage);
			}
		} catch (error) {
			console.error("An error occurred while creating the comment:", error);
		}
	};

	const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCommentText(e.target.value);
	};

	const handleEditCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setEditCommentText(e.target.value);
	};

	/**
	 * MODAL controls below:
	 * 1) Direct click on img: toggle modal (base on individual comment's ID)
	 * 2) Click outside of modal -> close modal & opened edit form
	 */
	const toggleModal = (commentId: string) => {
		setActiveModalCommentId(activeModalCommentId === commentId ? null : commentId);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// if (moreOptionsContainerRef.current && !moreOptionsContainerRef.current.contains(event.target as Node)) {
			// 	setActiveModalCommentId(null);
			// }
			if (!moreOptionsContainerRefs.current.some((ref) => ref?.contains(event.target as Node))) {
				setActiveModalCommentId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="mt-[100px]">
			<div className="user-comment-container">
				<h3 className="font-semibold">
					{comments.length} Comment{comments.length > 1 ? "s" : ""}
				</h3>
				<div className="user-form-container flex justify-center mt-5">
					{tokenActive ? (
						<div className="user-form">
							<p>{user.username}</p>
							<CommentForm handleSubmit={handleSubmit} handleCommentChange={handleCommentChange} commentText={commentText} setCommentText={setCommentText} />
						</div>
					) : (
						<Link to="/login" className="alert-container flex items-center gap-5 px-5 py-3 border-4  border-[#1ca1ba] rounded-md hover:bg-[#e84267] hover:border-[#e84267] hover:text-white transition duration-300 ease-in-out">
							<p className="text-xl hover">Join us, log in to comment.</p>
						</Link>
					)}
				</div>
			</div>

			{tokenActive ? (
				<div className="separator relative mt-5">
					<img className="bird absolute top-[-211px] right-[50px] h-[100px] w-[130px] object-contain" src={seagullImg} alt="" />
					{/* <svg id="wave" style={{ transform: "rotate(0deg)", transition: "0.3s" }} viewBox="0 0 1440 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
								<stop stopColor="rgba(22.507, 135.64, 189.329, 1)" offset="0%" />
								<stop stopColor="rgba(188.691, 238.152, 255, 1)" offset="100%" />
							</linearGradient>
						</defs>
						<path style={{ transform: "translate(0, 0px)", opacity: 1 }} fill="url(#sw-gradient-0)" d="M0,10L34.3,8.3C68.6,7,137,3,206,16.7C274.3,30,343,60,411,61.7C480,63,549,37,617,26.7C685.7,17,754,23,823,21.7C891.4,20,960,10,1029,15C1097.1,20,1166,40,1234,43.3C1302.9,47,1371,33,1440,38.3C1508.6,43,1577,67,1646,75C1714.3,83,1783,77,1851,66.7C1920,57,1989,43,2057,45C2125.7,47,2194,63,2263,68.3C2331.4,73,2400,67,2469,63.3C2537.1,60,2606,60,2674,56.7C2742.9,53,2811,47,2880,45C2948.6,43,3017,47,3086,55C3154.3,63,3223,77,3291,68.3C3360,60,3429,30,3497,26.7C3565.7,23,3634,47,3703,50C3771.4,53,3840,37,3909,28.3C3977.1,20,4046,20,4114,31.7C4182.9,43,4251,67,4320,75C4388.6,83,4457,77,4526,75C4594.3,73,4663,77,4731,65C4800,53,4869,27,4903,13.3L4937.1,0L4937.1,100L4902.9,100C4868.6,100,4800,100,4731,100C4662.9,100,4594,100,4526,100C4457.1,100,4389,100,4320,100C4251.4,100,4183,100,4114,100C4045.7,100,3977,100,3909,100C3840,100,3771,100,3703,100C3634.3,100,3566,100,3497,100C3428.6,100,3360,100,3291,100C3222.9,100,3154,100,3086,100C3017.1,100,2949,100,2880,100C2811.4,100,2743,100,2674,100C2605.7,100,2537,100,2469,100C2400,100,2331,100,2263,100C2194.3,100,2126,100,2057,100C1988.6,100,1920,100,1851,100C1782.9,100,1714,100,1646,100C1577.1,100,1509,100,1440,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"></path>
					</svg>{" "} */}
					<svg id="wave" style={{ transform: "rotate(0deg)", transition: "0.3s" }} viewBox="0 0 1440 65" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
								<stop stopColor="rgba(102.323, 171.495, 238.28, 1)" offset="0%" />
								<stop stopColor="rgba(168, 239.396, 249, 1)" offset="100%" />
							</linearGradient>
						</defs>
						<path style={{ transform: "translate(0, 0px)", opacity: 1 }} fill="url(#sw-gradient-0)" d="M0,40L40,33.3C80,27,160,13,240,18.3C320,23,400,47,480,48.3C560,50,640,30,720,18.3C800,7,880,3,960,11.7C1040,20,1120,40,1200,40C1280,40,1360,20,1440,10C1520,0,1600,0,1680,5C1760,10,1840,20,1920,20C2000,20,2080,10,2160,18.3C2240,27,2320,53,2400,65C2480,77,2560,73,2640,66.7C2720,60,2800,50,2880,43.3C2960,37,3040,33,3120,38.3C3200,43,3280,57,3360,63.3C3440,70,3520,70,3600,60C3680,50,3760,30,3840,30C3920,30,4000,50,4080,53.3C4160,57,4240,43,4320,38.3C4400,33,4480,37,4560,41.7C4640,47,4720,53,4800,50C4880,47,4960,33,5040,25C5120,17,5200,13,5280,20C5360,27,5440,43,5520,51.7C5600,60,5680,60,5720,60L5760,60L5760,100L5720,100C5680,100,5600,100,5520,100C5440,100,5360,100,5280,100C5200,100,5120,100,5040,100C4960,100,4880,100,4800,100C4720,100,4640,100,4560,100C4480,100,4400,100,4320,100C4240,100,4160,100,4080,100C4000,100,3920,100,3840,100C3760,100,3680,100,3600,100C3520,100,3440,100,3360,100C3280,100,3200,100,3120,100C3040,100,2960,100,2880,100C2800,100,2720,100,2640,100C2560,100,2480,100,2400,100C2320,100,2240,100,2160,100C2080,100,2000,100,1920,100C1840,100,1760,100,1680,100C1600,100,1520,100,1440,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"></path>
					</svg>
					<div className="land bg-[#c8b9b1] w-full h-[40px] border-t-[10px] border-[#ece7d1]"></div>
				</div>
			) : (
				<div className="separator relative mt-5">
					<img className="bird-intro absolute h-[100px] w-[130px] object-contain" src={seagullImg} alt="" />
					<div className="land bg-[#c8b9b1] w-full h-[50px] border-t-[15px] border-[#ece7d1]"></div>
				</div>
			)}

			<div className="comment-section flex flex-col items-center border-t-8 border-gray-300 pt-5 mb-10 text-gray-800">
				{comments.length == 0 ? (
					<div className="text-center">No comments yet, be the first to comment!</div>
				) : (
					comments.map((comment) => (
						<div key={comment._id} className="comment-container flex flex-col border-y-2 border-gray-200 w-[80vw] md:w-[65vw] px-2 py-3">
							<div className="user-info mb-3 flex gap-4 items-center">
								<div className="img-container w-[60px] h-[60px] rounded-full overflow-hidden">
									<img className="w-full h-full object-fit" src={defaultImg} alt="comment pfp" />
								</div>
								<div className="texts-container">
									<div className="flex items-center gap-3">
										<p className="font-semibold">{comment.user.username}</p>
										<div className="user-tags flex items-center gap-2">
											{user._id === comment.user._id && <p className="bg-[#e3801d] rounded-md px-3 text-white text-sm">YOU</p>}
											{comment.user._id === blog?.author._id && <p className="bg-[#89a02c] rounded-md px-3 text-white text-sm">OP</p>}
										</div>
									</div>
									<p className="text-gray-500">
										{formatDate(comment.date_posted)} {comment.edited && "(edited)"}
									</p>
								</div>
								{tokenActive && user._id === comment.user._id && (
									<div ref={(element) => moreOptionsContainerRefs.current.push(element)} className="more-options-container relative ml-auto -mt-5 cursor-pointer">
										<img onClick={() => toggleModal(comment._id)} className="w-[35px]" src={dotsSvg} alt="comment options modal" />
										{activeModalCommentId === comment._id && <CommentModal commentId={comment._id} refreshComments={refreshComments} comment={comment} handleEditComment={handleEditComment} />}
									</div>
								)}
							</div>
							<div className="comment-container flex">
								<div className="connector ml-7 -mt-1 border-l-2 border-b-2 w-[13px] h-[20px] border-[#d80a77]"></div>
								{editActive && activeEditCommentId === comment._id ? <EditForm commentId={activeEditCommentId} handleEditChange={handleEditCommentChange} editCommentText={editCommentText} setEditActive={setEditActive} refreshComments={refreshComments} /> : <p className="ml-3">{comment.text}</p>}
							</div>
							<div className="bottom-container flex items-center gap-2 mt-3 ">
								<CommentLikes comment={comment} refreshComments={refreshComments} />
								<CommentReplies comment={comment} refreshComments={refreshComments}/>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default CommentSection;
