import { useState, type ChangeEvent } from "react";
import { Play, Timer, ChevronUp, ChevronDown } from "lucide-react";

export function YTStamper() {
	const [stamps, setStamps] = useState<string[]>([]);

	function onStampClick() {
		const video = document.querySelector("video");
		const currentTime = video?.currentTime ?? 0;

		setStamps([parseDuration(currentTime)]);
	}

	function onDurationChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;
		console.log("debug:value", value);
		setStamps((stamps) => {
			stamps[0] = value;
			return stamps;
		});
	}

	function add() {
		setStamps([parseDuration(durationToNumber(stamps[0]) + 1)]);
	}

	function parseDuration(duration: number) {
		if (duration < 0) return "00:00";

		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor(duration / 60);
		const seconds = Math.floor(duration % 60);
		return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	function durationToNumber(duration: string): number {
		const splitted = duration.split(":");
		if (splitted.length === 3) {
			return (
				Number.parseInt(splitted[0]) * 3600 +
				Number.parseInt(splitted[1]) * 60 +
				Number.parseInt(splitted[2])
			);
		}
		if (splitted.length === 2) {
			return Number.parseInt(splitted[0]) * 60 + Number.parseInt(splitted[1]);
		}
		return Number.parseInt(splitted[0]);
	}

	return (
		<div className="p-2 border border-solid border-white overflow-auto">
			<div className="flex items-center gap-3">
				<div className="flex items-center justify-start">
					<input
						className="w-12 h-9 text-black text-base "
						type="text"
						placeholder="00:00"
						value={stamps[0]}
						onChange={onDurationChange}
					/>
					<div className="flex flex-col">
						<button
							className="px-1 border border-solid text-base text-white"
							type="button"
							onClick={add}
						>
							<ChevronUp className="text-base" size="1em" />
						</button>
						<button
							className="px-1 border border-solid text-base text-white"
							type="button"
							onClick={() => {}}
						>
							<ChevronDown className="text-base" size="1em" />
						</button>
					</div>
				</div>

				<div
					className="min-h-9 flex-grow text-base  bg-white"
					contentEditable
				/>

				<button
					className="p-2 border border-solid rounded text-base text-white"
					type="button"
				>
					<Play className="text-2xl" size="1em" />
				</button>
				<button
					className="p-2 border border-solid rounded text-base text-white"
					type="button"
					onClick={onStampClick}
				>
					<Timer className="text-2xl" size="1em" />
				</button>
			</div>
		</div>
	);
}
