import { useRef, useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import parse from "html-react-parser";

function WritePage() {
	const [content, setContent] = useState("Add your content here!");
	const [apiKey, setApiKey] = useState(null);
	const editorRef = useRef<TinyMCEEditor | null>(null);

	const handleEditorChange = (content: string) => {
		setContent(content);
	};

	useEffect(() => {
		// Get the JWT token from localStorage
		const token = localStorage.getItem("jwt_token");
		if (!token) {
			throw new Error("JWT token not found");
		}

		const fetchAPI = async () => {
			try {
				const response = await fetch("https://wayfarers-frontier-api.fly.dev/tiny_mce_api_key", {
					mode: "cors",
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const api_key = await response.json();
				setApiKey(api_key.api_key);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchAPI();
	}, []);

	return (
		<>
			<Navbar />
			<p className="flex justify-center inline-block px-10 py-2 bg-[#f0c033] font-bold">This page is under construction ⚠️</p>

			<main className="flex flex-col md:flex-row gap-5 p-5">
				{apiKey && (
					<Editor
						apiKey={apiKey}
						onInit={(_evt, editor) => (editorRef.current = editor)}
						onEditorChange={handleEditorChange}
						init={{
							height: 500,
							plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"],
							toolbar: "undo redo | blocks fontfamily | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
							content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
						initialValue="Add your content here!"
					/>
				)}
				<div className="display w-full md:w-[50vw] border-2 border-gray-300 p-3 rounded-md">{parse(content)}</div>
			</main>
			<Footer />
		</>
	);
}

export default WritePage;
