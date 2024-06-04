import { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TinyMCE from "../EditorParts/tinyMCE";
import GeneralInput from "../EditorParts/GeneralInput";
import ImageInput from "../EditorParts/ImageInput";
import SubmitBlog from "../EditorParts/SubmitBlog";
import parse from "html-react-parser";

function WritePage() {
	const [activeTab, setActiveTab] = useState('general')
	const [content, setContent] = useState("Add your content here!"); // This is to display on "preview" the main content of blog

	const handleTinyMceEditorChange = (content: string) => {
		setContent(content);
	};

	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow  flex flex-col md:flex-row gap-5 p-5">
				<div className="left-side ">
					<div className="tabs flex gap-2 md:ml-8 -mb-[2.5px] font-semibold">
						<button onClick={() => handleTabChange('general')} className={`${activeTab == 'general' ? 'border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]' : ''} p-2 rounded-t-md`} type="button">GENERAL</button>
						<button onClick={() => handleTabChange('image')} className={`${activeTab == 'image' ? 'border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]' : ''} p-2 rounded-t-md`} type="button">IMAGE</button>
						<button onClick={() => handleTabChange('content')} className={`${activeTab == 'content' ? 'border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]' : ''} p-2 rounded-t-md`} type="button">CONTENT</button>
						<button onClick={() => handleTabChange('submit')} className={`${activeTab == 'submit' ? 'border-2 border-[#f2efee] border-b-2 border-b-[#f1f5f7] bg-[#f1f5f7] text-[#db117d]' : ''} p-2 rounded-t-md`} type="button">SUBMIT</button>
					</div>
					<div className="input-section pt-2 bg-[#f1f5f7] border-2 border-[#f2efee] rounded-l-md rounded-r-md ">
						{
							activeTab == 'content' ? (
								<TinyMCE handleEditorChange={handleTinyMceEditorChange} />
							) : activeTab == 'general' ? (
								<GeneralInput />
							) : activeTab == 'image' ? (
								<ImageInput />
							) : (
								<SubmitBlog />
							)
						}
					</div>
				</div>
				<div className="right-side w-full md:w-[50vw]">
					<div className="flex justify-center -mb-[2px]">
						<h2 className="py-2 px-4 rounded-t-md text-center bg-[#db117d] border-2 border-2-[#a5adba] text-white font-semibold">Preview</h2>
					</div>
					<div className="display bg-white border-2 border-2-[#a5adba] p-3 rounded-md h-[93%]">{parse(content)}</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default WritePage;
