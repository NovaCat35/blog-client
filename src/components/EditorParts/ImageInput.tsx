import { useState, useContext } from "react";
import { EditorContext } from "../Pages/WritePage";

function ImageInput() {
	const { imgCreatorName, imgSrcLink, setFile, setImgCreatorName, setImgSrcLink } = useContext(EditorContext);
	const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dx432kzlt/image/upload/v1717559527/blog_posts/main_blog_images/travel-dino-reichmuth_bcuon5.jpg");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			const fileUrl = URL.createObjectURL(selectedFile); // Get the URL of the selected file
			setImageUrl(fileUrl); // Set the image URL to display
		}
	};

	const handleImgCreatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImgCreatorName(e.target.value);
	};

	const handleImgSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImgSrcLink(e.target.value);
	};

	return (
		<div className="h-[500px] md:w-[48vw] px-4">
			<div className="file-container flex justify-center">
				<input
					className="
						ml-4 mt-5 mb-3 file:cursor-pointer
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						file:bg-[#db117d] file:text-white
						file:transition-all file:duration-300
						hover:file:bg-[#f0c033]
					"
					type="file"
					name="img_file"
					id="img_file"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</div>
			<div className="input-container mb-2">
				<label htmlFor="read-time">Who's the image creator?</label>
				<input onChange={handleImgCreatorChange} id="read-time" type="text" placeholder="Artist's name" min={0} value={imgCreatorName} />
			</div>
			<div className="input-container mb-2">
				<label htmlFor="read-time">Where's the image source?</label>
				<input onChange={handleImgSrcChange} id="read-time" type="text" placeholder="Unsplash" min={0} value={imgSrcLink} />
			</div>
			{imageUrl && (
				<div className="flex justify-center">
					<img className="object-contain h-[300px]" src={imageUrl} alt="Selected Image" />
				</div>
			)}
		</div>
	);
}

export default ImageInput;
