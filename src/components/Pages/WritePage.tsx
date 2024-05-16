import { useRef, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import parse from "html-react-parser";

function WritePage() {
	const [content, setContent] = useState("Add your content here!");
	const editorRef = useRef<TinyMCEEditor | null>(null);

	const handleEditorChange = (content: string) => {
		setContent(content);
	};

	return (
		<>
			<Navbar />
			<p className="flex justify-center inline-block px-10 py-2 bg-[#f0c033] font-bold">This page is under construction ⚠️</p>

			<main className="flex flex-col md:flex-row gap-5 p-5">
				<Editor
					apiKey="7qfev4qoqie78fs39wy2e3z0is6z6julvewat0azq5ut11gm"
					onInit={(_evt, editor) => (editorRef.current = editor)}
					onEditorChange={handleEditorChange}
					init={{
						height: 500,
						plugins: "markdown anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown advlist preview fullscreen insertdatetime code help",
						toolbar: "undo redo | blocks fontfamily | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
						content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
					initialValue="Add your content here!"
				/>
				<div className="display w-full md:w-[50vw] border-2 border-gray-300 p-3 rounded-md">{parse(content)}</div>
			</main>
			<Footer />
		</>
	);
}

export default WritePage;
