import { useRef, useEffect, useState, useContext } from "react";
import { EditorContext } from "../Pages/WritePage";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import Loading from "../Loading";

function ContentInput() {
	const { setContent, content } = useContext(EditorContext);
	const [apiKey, setApiKey] = useState(null);
	const editorRef = useRef<TinyMCEEditor | null>(null);

	// Fetch the TinyMCE's api key to get this thing working.
	useEffect(() => {
		const token = localStorage.getItem("jwt_token");
		if (!token) {
			throw new Error("JWT token not found");
		}

		const fetchAPIKey = async () => {
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
		fetchAPIKey();
	}, []);

	const handleTinyMceEditorChange = (content: string) => {
		setContent(content);
	};

	return (
		<div className="h-[500px] md:w-[48vw]">
			{apiKey ? (
				<Editor
					apiKey={apiKey}
					onInit={(_evt, editor) => (editorRef.current = editor)}
					onEditorChange={handleTinyMceEditorChange}
					init={{
						height: 500,
						plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"],
						toolbar: "undo redo | blocks fontfamily | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
						content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
					value={content || "Add your content here!"}
				/>
			) : (
				<Loading />
			)}
		</div>
	);
}

export default ContentInput;
