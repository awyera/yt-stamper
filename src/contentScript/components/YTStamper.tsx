import { useState } from "react";
import { Play, Timer } from "lucide-react";

export function YTStamper() {
	const [stamps, setStamps] = useState<number[]>([]);

	function onStampClick() {
		const video = document.querySelector("video");
		const currentTime = video?.currentTime ?? 0;

		setStamps([currentTime]);
	}

	function parseDuration(duration: number) {
		if (!duration) return "";

		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor((duration - hours * 3600) / 60);
		const seconds = Math.floor(duration - hours * 3600 - minutes * 60);

		return `${hours}:${minutes}:${seconds}`;
	}

	return (
		<div className="p-2 border border-solid border-white text-white">
			<div className="flex gap-3">
				<input
					className="text-black text-base"
					type="text"
					placeholder="00:00"
					value={parseDuration(stamps[0])}
					onChange={() => {}}
				/>
				<textarea className="text-base" placeholder="text" rows={1} />
				<button className="border border-solid rounded text-base" type="button">
					<Play />
				</button>
				<button
					className="border border-solid rounded text-base"
					type="button"
					onClick={onStampClick}
				>
					<Timer className="text-base" size="1em" />
				</button>
			</div>
		</div>
	);
}
