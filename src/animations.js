export const fadeIn = {
	hidden: {
		opacity: 0
	},
	show: {
		opacity: 1,
		transition: {
			duration: 1
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.75 }
		}
	}
};

export const popup = {
	hidden: {
		opacity: 0,
		scale: 0.2
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 3
		},
		exit: {
			opacity: 0,
			transition: { duration: 1.5 }
		}
	}
};
