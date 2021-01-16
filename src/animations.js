export const revealIn = {
	hidden: {
		opacity: 0
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.25
		}
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.75 }
	}
};

export const appear = {
	hidden: {
		opacity: 0,
		scale: 0.2
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 1
		}
	},
	exit: {
		opacity: 0,
		transition: { duration: 1 }
	}
};
