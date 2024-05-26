import React, { ChangeEvent } from "react";

interface EditFormProps {
	commentId: string;
	handleEditChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	editCommentText: string;
	setEditActive: React.Dispatch<React.SetStateAction<boolean>>;
	refreshComments: () => void;
}

function EditForm({ commentId, handleEditChange, editCommentText, setEditActive, refreshComments }: EditFormProps) {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// Get the JWT token from local Storage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}

			// Update the comment with a PUT request
			const response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${commentId}`, {
				mode: "cors",
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					comment: editCommentText,
				}),
			});

			if (response.ok) {
				refreshComments();
				setEditActive(false);
				const data = await response.json();
				console.log(data.message);
			} else {
				const errorMessage = await response.text();
				console.error("Failed to update comment:", response.status, errorMessage);
			}
		} catch (error) {
			console.error("An error occurred while updating the comment:", error);
		}
	};
	return (
		<form className="border-2 w-[100%] mb-3" onSubmit={handleSubmit}>
			<label htmlFor="comment"></label>
			<div className="relative">
				<textarea onChange={handleEditChange} value={editCommentText} placeholder="What are your thoughts?" className="w-full outline-none px-3 py-3" id="comment" name="comment" minLength={2} rows={2} />
				<div className="absolute -bottom-5 right-3 flex justify-end gap-3 pb-2">
					<button type="button" className="bg-[#a5adba] text-sm text-white px-3 py-1 rounded transition ease-in-out hover:bg-[#7a7e99]" onClick={() => setEditActive(false)}>
						Cancel
					</button>
					<button type="submit" className="bg-[#89a02c] text-sm text-white px-5 py-[0.5px] rounded transition ease-in-out hover:bg-[#6ca02c]">
						Edit
					</button>
				</div>
			</div>
		</form>
	);
}

export default EditForm;
