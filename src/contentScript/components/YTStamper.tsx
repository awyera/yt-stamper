import { useState } from "react";
import { Play, Timer, ChevronUp, ChevronDown } from "lucide-react";

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
		<div className="p-2 border border-solid border-white">
			<div className="flex gap-3">
				<div className="flex items-center justify-start">
					<input
						className="text-black text-base"
						type="text"
						placeholder="00:00"
						value={parseDuration(stamps[0])}
						onChange={() => {}}
					/>
					<div className="flex flex-col">
						<button
							className="border border-solid text-base text-white"
							type="button"
							onClick={() => {}}
						>
							<ChevronUp className="text-base" size="1em" />
						</button>
						<button
							className="border border-solid text-base text-white"
							type="button"
							onClick={() => {}}
						>
							<ChevronDown className="text-base" size="1em" />
						</button>
					</div>
				</div>

				<textarea className="text-base" placeholder="text" rows={1} />
				<button
					className="border border-solid rounded text-base text-white"
					type="button"
				>
					<Play className="text-base" size="1em" />
				</button>
				<button
					className="border border-solid rounded text-base text-white"
					type="button"
					onClick={onStampClick}
				>
					<Timer className="text-base" size="1em" />
				</button>
			</div>
		</div>
	);
}
