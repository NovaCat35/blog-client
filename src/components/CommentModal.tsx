interface CommentModalProps {
	commentId: string;
	refreshComments: () => void;
}

function CommentModal({ commentId, refreshComments }: CommentModalProps) {
	const handleDelete = async () => {
		try {
			// Get the JWT token from localStorage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}

			const response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${commentId}`, {
				mode: "cors",
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				// Handle error
				console.error("Failed to delete comment");
			} else {
            refreshComments();
				const data = await response.json();
				console.log(data.message);
			}
		} catch (error) {
			console.error("An error occurred while deleting the comment:", error);
		}
	};

	return (
		<div className="comment-modal-container absolute border-2 border-gray-400 px-4 py-2 rounded-md top-6 -right-5 bg-white">
			<p>Edit</p>
			<p onClick={handleDelete}>Delete</p>
		</div>
	);
}

export default CommentModal;
