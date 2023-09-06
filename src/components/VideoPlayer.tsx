import { FC } from "react";

interface MyProps {
	videoUrl?: string;
}
export const VideoPlayer: FC<MyProps> = ({ videoUrl = "https://drive.google.com/file/d/1EykMLJJOU_ilr_oQbqyrIBLrx2v_TpvC/preview"}) => {
	return (
		<div>
			<iframe
				className={"w-full md:h-[70vh] h-[45vh]"}
				src={videoUrl}
				title="Google Drive Video"
				frameBorder="0"
				allowFullScreen
			></iframe>
		</div>
	);
}