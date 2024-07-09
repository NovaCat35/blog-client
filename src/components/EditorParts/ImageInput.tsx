import { useState, useContext } from "react";
import { EditorContext } from "../Pages/WritePage";

function ImageInput() {
	const { imgCreatorName, imgSrcName, setFile, setImgCreatorName, setImgSrcName } = useContext(EditorContext);
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
		setImgSrcName(e.target.value);
	};

	return (
		<div className="h-[500px] md:w-[48vw] px-2">
			<div className="file-container flex justify-center">
				<input className="ml-4 mt-[20px] mb-[10px] cursor-pointer" type="file" name="img_file" id="img_file" accept="image/*" onChange={handleFileChange} />
			</div>
			<div className="input-container mb-2">
				<label htmlFor="read-time">Who's the image creator?</label>
				<input onChange={handleImgCreatorChange} id="read-time" type="text" placeholder="Artist's name" min={0} value={imgCreatorName} />
			</div>
			<div className="input-container mb-2">
				<label htmlFor="read-time">Where's the image source?</label>
				<input onChange={handleImgSrcChange} id="read-time" type="text" placeholder="Unsplash" min={0} value={imgSrcName} />
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
