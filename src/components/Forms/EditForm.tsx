import React, { ChangeEvent } from "react";

interface EditFormProps {
	handleEditChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	editCommentText: string;
	setEditActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditForm({ handleEditChange, editCommentText, setEditActive }: EditFormProps) {
	return (
		<form className="border-2 w-[100%] mb-3" action="/">
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
