interface DeleteBtnProps {
	refreshComments: () => void;
  commentId: string;
  replyId: string;
}

function DeleteBtn({ refreshComments, commentId, replyId }: DeleteBtnProps) {
	const handleDelete = async () => {
		try {
			// Get the JWT token from localStorage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}

			const response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${commentId}/replies/${replyId}`, {
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
		<p className="text-gray-500 hover:text-[#e7175a]" onClick={handleDelete}>
			Delete
		</p>
	);
}

export default DeleteBtn;
