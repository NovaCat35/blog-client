import loadingGif from "../assets/loading.gif";

function Loading() {
	return (
		<div className="bg-[#4fd1ec] flex items-center flex-col relative rounded-md">
			<img className="h-[350px] w-[80vw] object-contain" src={loadingGif} alt="loading gif" />
			<h1 className="loading absolute text-white bottom-2 md:bottom-1 text-4xl">Loading . . .</h1>
		</div>
	);
}

export default Loading;
