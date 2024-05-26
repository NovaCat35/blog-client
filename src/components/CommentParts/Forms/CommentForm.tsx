import React, { ChangeEvent, FormEvent } from "react";

interface CommentFormProps {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	handleCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	commentText: string;
	setCommentText: React.Dispatch<React.SetStateAction<string>>;
}

function CommentForm({ handleSubmit, handleCommentChange, commentText, setCommentText }: CommentFormProps) {
	return (
		<form className="border-2 w-[80vw]" onSubmit={handleSubmit} action="/">
			<label htmlFor="comment"></label>
			<div className="relative">
				<textarea onChange={handleCommentChange} value={commentText} placeholder="What are your thoughts?" className="w-full outline-none px-5 py-5" id="comment" name="comment" minLength={2} rows={2} />
				<div className="absolute bottom-0 right-3 flex justify-end gap-5 pb-2">
					<button type="button" className="font-semibold transition ease-in-out hover:text-[#4a5366]" onClick={() => setCommentText("")}>
						Cancel
					</button>
					<button type="submit" className="bg-[#1ca1ba] font-semibold text-white px-5 py-1 rounded-md transition ease-in-out hover:bg-[#1c7aba]">
						Respond
					</button>
				</div>
			</div>
		</form>
	);
}

export default CommentForm;
