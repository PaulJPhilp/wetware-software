export function BrainIcon({ className = "" }: { className?: string }) {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Brain icon</title>
			{/* Left hemisphere */}
			<path d="M8 4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
			<path d="M12 2v8" />
			<path d="M4 7c0-1.1.9-2 2-2s2 .9 2 2" />
			<path d="M4 12c0-1.1.9-2 2-2s2 .9 2 2" />
			<path d="M4 17c0-1.1.9-2 2-2s2 .9 2 2" />
			{/* Right hemisphere */}
			<path d="M16 7c0-1.1.9-2 2-2s2 .9 2 2" />
			<path d="M16 12c0-1.1.9-2 2-2s2 .9 2 2" />
			<path d="M16 17c0-1.1.9-2 2-2s2 .9 2 2" />
			{/* Connectors */}
			<path d="M6 9v3" />
			<path d="M6 14v3" />
			<path d="M18 9v3" />
			<path d="M18 14v3" />
			{/* Bottom curves */}
			<path d="M8 19c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2" />
		</svg>
	);
}

export function RobotIcon({ className = "" }: { className?: string }) {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Robot icon</title>
			{/* Head */}
			<rect x="4" y="6" width="16" height="14" rx="2" />
			{/* Antenna */}
			<path d="M12 6V3" />
			<circle cx="12" cy="3" r="0.5" fill="currentColor" />
			{/* Eyes */}
			<circle cx="9" cy="12" r="1.5" />
			<circle cx="15" cy="12" r="1.5" />
			{/* Display panel */}
			<path d="M8 16h8" />
			<path d="M7 16h10" strokeDasharray="1,2" />
			{/* Side panels */}
			<path d="M4 10h2" />
			<path d="M4 14h2" />
			<path d="M18 10h2" />
			<path d="M18 14h2" />
		</svg>
	);
}
