import { useState } from "react";
import heartSvg from "../../assets/heart.svg";
import heartFilledSvg from "../../assets/heart-filled.svg";
import { Comment } from "../../contexts/BlogContext";

interface CommentLikesProps {
	comment: Comment;
	refreshComments: () => void;
}

function CommentLikes({ comment, refreshComments }: CommentLikesProps) {
	/* heart animation */
	const [activeHeart, setActiveHeart] = useState<string | null>(null);

	const handleClick = async () => {
		try {
			// Get the JWT token from localStorage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}
			const response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${comment._id}/likes`, {
				mode: "cors",
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				refreshComments();
				const data = await response.json();
				console.log(data.message);
			} else {
				const errorMessage = await response.text();
				console.error("Failed to update comment:", response.status, errorMessage);
			}
		} catch (error) {
			console.error("An error occurred while updating the comment's likes:", error);
		}

		// Do animation effect after fetching and updating comment's likes data
		handleAnimation();
	};

	const handleAnimation = () => {
		setActiveHeart(comment._id);
	};

	const handleAnimationEnd = () => {
		setActiveHeart(null);
	};

	return (
		<div className="likes-container flex items-center gap-1">
			<img onClick={handleClick} className={`heart w-[30px] cursor-pointer ${activeHeart == comment._id ? "animate" : ""}`} src={activeHeart == comment._id ? heartFilledSvg : heartSvg} alt="heart icon" onAnimationEnd={handleAnimationEnd} />
			{comment.likes.length > 0 && <p className="mr-3">{comment.likes.length}</p>}
		</div>
	);
}

export default CommentLikes;
