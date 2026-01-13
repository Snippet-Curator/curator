<!-- <div class="absolute inset-0 -z-10 overflow-hidden">
	<div class="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
		<svg width="100%" height="100%" class="absolute">
			<pattern
				id="circuit-pattern"
				x="0"
				y="0"
				width="100"
				height="100"
				patternUnits="userSpaceOnUse"
			>
				<path
					d="M0 50h40c5.5 0 10 4.5 10 10s4.5 10 10 10h40M50 0v40c0 5.5 4.5 10 10 10s10 4.5 10 10v40"
					stroke="currentColor"
					strokeWidth="1"
					fill="none"
					class="text-gray-400 dark:text-gray-600"
				/>
			</pattern>
			<rect width="100%" height="100%" fill="url(#circuit-pattern)" />
		</svg>
	</div>
</div> -->

<div class="absolute inset-0 -z-100 bg-white dark:bg-gray-950">
	<div class="absolute inset-0">
		<svg
			class="absolute inset-0 h-full w-full opacity-30 dark:opacity-20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<pattern
				id="circuit-advanced"
				x="0"
				y="0"
				width="100"
				height="100"
				patternUnits="userSpaceOnUse"
			>
				<circle cx="10" cy="10" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="50" cy="10" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="90" cy="10" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="10" cy="50" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="50" cy="50" r="3" class="fill-gray-800 dark:fill-gray-700" />
				<circle cx="90" cy="50" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="10" cy="90" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="50" cy="90" r="2" class="fill-gray-500 dark:fill-gray-400" />
				<circle cx="90" cy="90" r="2" class="fill-gray-500 dark:fill-gray-400" />

				<path
					d="M10 10 H 30 V 50 H 10 M50 10 V 30 H 90 M50 50 H 70 V 90 M10 50 H 30 M50 50 H 70 M90 50 V 70 H 70"
					stroke="currentColor"
					strokeWidth="1"
					class="text-gray-500 dark:text-gray-400"
					fill="none"
				/>
			</pattern>
			<rect width="100%" height="100%" fill="url(#circuit-advanced)" />
		</svg>
	</div>
	<div
		class="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-purple-50/30 dark:from-gray-950/20 dark:via-transparent dark:to-purple-950/20"
	/>
</div>
