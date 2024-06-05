import { useState, useContext } from "react";
import { EditorContext } from "../Pages/WritePage";

function GeneralInput() {
	const [currentTag, setCurrentTag] = useState("");
	const { title, readTime, tags, setTitle, setReadTime, setTags } = useContext(EditorContext);

	const addTag = () => {
		const tagInList = tags.find((tag) => tag == currentTag); // don't add if already in tags list
		if (currentTag.trim() !== "" && tags.length < 5 && !tagInList) {
			setTags([...tags, currentTag.trim()]);
			setCurrentTag("");
		}
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleReadTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReadTime(e.target.value);
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTag(e.target.value);
	};

	const removeTag = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	return (
		<div className="h-[500px] md:w-[48vw]">
			<p className="w-full bg-[#db117d] px-2 py-2 text-white">You have to be a verified user to submit a blog.</p>

			<div className="main-inputs-section px-4 py-2 flex flex-col gap-2">
				<div className="input-container mt-4">
					<label htmlFor="title">Blog Title</label>
					<input onChange={handleTitleChange} id="title" type="text" placeholder="Around the World" maxLength={85} value={title}/>
				</div>
				<div className="input-container">
					<label htmlFor="read-time">Estimated read time (minutes)</label>
					<input onChange={handleReadTimeChange} id="read-time" type="number" placeholder="5" min={0} value={readTime}/>
				</div>
				<div className="input-container">
					<label htmlFor="tags">Add tags to describe your project (up to 5 max)</label>
					<input onChange={handleTagChange} id="tags" type="text" placeholder="Travel" maxLength={25} value={currentTag} />
					<button className="w-full text-white py-1 bg-[#14c1be] hover:bg-[#00adb3]" onClick={addTag} type="button">
						Add Tag
					</button>
				</div>
				{tags.length > 0 && (
					<div className="flex gap-2 mt-2">
						Tags:{" "}
						{tags.map((tag) => (
							<p className="px-2 bg-[white] border rounded-md cursor-pointer" key={tag} onClick={() => removeTag(tag)}>
								{tag} <span className="cross text-[#db117d]">x</span>
							</p>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default GeneralInput;
