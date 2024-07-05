import React, { useState, createContext } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ContentInput from "../EditorParts/ContentInput";
import GeneralInput from "../EditorParts/GeneralInput";
import ImageInput from "../EditorParts/ImageInput";
import SubmitBlog from "../EditorParts/SubmitBlog";
import Preview from "../EditorParts/Preview";
import "../../styles/Editor.scss";

interface IEditorContext {
	title: string;
	readTime: string;
	tags: string[];
	file: File | null;
	imgCreatorName: string;
	imgSrcName: string;
	content: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setReadTime: React.Dispatch<React.SetStateAction<string>>;
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	setImgCreatorName: React.Dispatch<React.SetStateAction<string>>;
	setImgSrcName: React.Dispatch<React.SetStateAction<string>>;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const EditorContext = createContext<IEditorContext>({
	title: '',
	readTime: '',
	tags: [],
	file: null,
	imgCreatorName: '',
	imgSrcName: '',
	content: '',
	setTitle: () => {},
	setReadTime: () => {},
	setTags: () => {},
	setFile: () => {},
	setImgCreatorName: () => {},
	setImgSrcName: () => {},
	setContent: () => {},
});

function WritePage() {
	const [activeTab, setActiveTab] = useState("general");
	const [content, setContent] = useState("Add your content here!"); // This is to display on "preview" the main content of blog
	const [title, setTitle] = useState("Around the World");
	const [readTime, setReadTime] = useState("5");
	const [tags, setTags] = useState<string[]>(['Travel', 'World Tour']);
	const [file, setFile] = useState<File | null>(null);
	const [imgCreatorName, setImgCreatorName] = useState("Dino Reichmuth");
	const [imgSrcName, setImgSrcName] = useState("https://unsplash.com/photos/yellow-volkswagen-van-on-road-A5rCN8626Ck");

	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<EditorContext.Provider value={{ title, readTime, tags, file, imgCreatorName, imgSrcName, content, setTitle, setReadTime, setTags, setFile, setImgCreatorName, setImgSrcName, setContent }}>
				<main className="flex-grow flex flex-col md:flex-row gap-5 p-5">
					<div className="info-section">
						<div className="tabs flex gap-2 ml-4 md:ml-8 -mb-[2.5px] font-semibold">
							<button onClick={() => handleTabChange("general")} className={`${activeTab === "general" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
								GENERAL
							</button>
							<button onClick={() => handleTabChange("image")} className={`${activeTab === "image" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
								IMAGE
							</button>
							<button onClick={() => handleTabChange("content")} className={`${activeTab === "content" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
								CONTENT
							</button>
							<button onClick={() => handleTabChange("submit")} className={`${activeTab === "submit" ? "border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]" : ""} p-2 rounded-t-md`} type="button">
								SUBMIT
							</button>
						</div>
						<div className="input-section pt-2 bg-[#f1f5f7] border-2 border-[#f2efee] rounded-l-md rounded-r-md ">{activeTab === "content" ? <ContentInput /> : activeTab === "general" ? <GeneralInput /> : activeTab === "image" ? <ImageInput /> : <SubmitBlog />}</div>
					</div>
					<div className="preview-section w-full md:w-[50vw]">
						<div className="flex justify-center -mb-[2px]">
							<h2 className="py-2 px-4 rounded-t-md text-center bg-[#db117d] border-2 border-2-[#a5adba] text-white font-semibold">Preview</h2>
						</div>
						<Preview />
					</div>
				</main>
			</EditorContext.Provider>
			<Footer />
		</div>
	);
}

export default WritePage;
