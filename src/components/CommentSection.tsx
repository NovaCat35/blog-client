import { useContext, useState, useEffect, ChangeEvent, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext, Comment, Blog } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import formatDate from "../functions/DateFormatter";
import defaultImg from "../assets/default.jpeg";
import dotsSvg from "../assets/dots-horizontal.svg";
import CommentModal from "./CommentModal";

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
	const [activeModalCommentId, setActiveModalCommentId] = useState<string | null>(null);
	// we keep a separate activeId for edit since we want to close(or make null) the modal when editing
	const [activeEditCommentId, setActiveEditCommentId] = useState<string | null>(null);
	const moreOptionsContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

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
		console.log("open edit");
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
			// 	console.log("we are out");
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
		<>
			<h3 className="font-semibold">
				{comments.length} Comment{comments.length > 1 ? "s" : ""}
			</h3>
			<div className="user-form-container flex justify-center mt-5">
				{tokenActive ? (
					<div className="user-form">
						<p>{user.username}</p>
						<form className="border-2 w-[80vw]" onSubmit={handleSubmit} action="/">
							<label htmlFor="comment"></label>
							<div className="relative">
								<textarea onChange={handleCommentChange} value={commentText} placeholder="What are your thoughts?" className="w-full outline-none px-5 py-5" id="comment" name="comment" minLength={2} rows={2} />
								<div className="absolute bottom-0 right-3 flex justify-end gap-5 pb-2">
									<button type="button" className="font-semibold" onClick={() => setCommentText("")}>
										Cancel
									</button>
									<button type="submit" className="bg-[#1ca1ba] font-semibold text-white px-5 py-1 rounded-md">
										Respond
									</button>
								</div>
							</div>
						</form>
					</div>
				) : (
					<Link to="/login" className="alert-container flex items-center gap-5 px-5 py-3 border-4 border-[#e84267] rounded-md hover:bg-[#e84267] hover:text-white transition duration-300 ease-in-out">
						<p className="text-xl hover">Join us, log in to comment.</p>
					</Link>
				)}
			</div>

			<div className="comment-section flex flex-col items-center border-t-8 border-gray-300 pt-5 mt-5 mb-10 text-gray-800">
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
										{user._id === comment.user._id && <p className="bg-[#89a02c] rounded-md px-3 text-white text-sm">YOU</p>}
									</div>
									<p className="text-gray-500">{formatDate(comment.date_posted)}</p>
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
								{editActive && activeEditCommentId === comment._id ? (
									<form className="border-2 w-[100%] mb-3" action="/">
										<label htmlFor="comment"></label>
										<div className="relative">
											<textarea onChange={handleEditCommentChange} value={editCommentText} placeholder="What are your thoughts?" className="w-full outline-none px-3 py-3" id="comment" name="comment" minLength={2} rows={2} />
											<div className="absolute -bottom-5 right-3 flex justify-end gap-3 pb-2">
												<button type="button" className="bg-[#a5adba] text-sm text-white px-3 py-1 rounded-md" onClick={() => setEditActive(false)}>
													Cancel
												</button>
												<button type="submit" className="bg-[#89a02c] text-sm text-white px-5 py-[0.5px] rounded">
													Edit
												</button>
											</div>
										</div>
									</form>
								) : (
									<p className="ml-3">{comment.text}</p>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
}

export default CommentSection;
