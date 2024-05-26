import { useState } from "react";
import messageSvg from "../../assets/chat-bubble.svg";
// import { Comment } from "../../contexts/BlogContext";

// interface CommentLikesProps {
// 	comment: Comment;
// 	refreshComments: () => void;
// }

function CommentReplies() {
	// const handleClick = async () => {
	// 	try {
	// 		// Get the JWT token from localStorage
	// 		const token = localStorage.getItem("jwt_token");
	// 		if (!token) {
	// 			throw new Error("JWT token not found");
	// 		}
	// 		const response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${comment._id}/likes`, {
	// 			mode: "cors",
	// 			method: "PUT",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});

	// 		if (response.ok) {
	// 			refreshComments();
	// 			const data = await response.json();
	// 			console.log(data.message);
	// 		} else {
	// 			const errorMessage = await response.text();
	// 			console.error("Failed to update comment:", response.status, errorMessage);
	// 		}
	// 	} catch (error) {
	// 		console.error("An error occurred while replying:", error);
	// 	}
	// };

	return (
      <div className="reply flex items-center gap-1 cursor-pointer">
      <img className="w-[28px]" src={messageSvg} alt="reply icon" />
      <p className="text-[14px] text-[#8d939e] font-medium">Reply</p>
   </div>
	);
}

export default CommentReplies;
