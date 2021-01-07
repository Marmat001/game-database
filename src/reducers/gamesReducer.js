const initState = {
	popular: [],
	newGames: [],
	upcoming: [],
	searched: JSON.parse(localStorage.getItem('searched')) || [],
	isBuffering: 'searched'.length ? false : true,
	isPopularBuffering: true,
	isUpcomingBuffering: true,
	isNewBuffering: true
};

const gamesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_POPULAR':
			return {
				...state,
				popular: action.payload.popular,
				isPopularBuffering: false
			};
		case 'FETCH_UPCOMING':
			return {
				...state,
				upcoming: action.payload.upcoming,
				isUpcomingBuffering: false
			};
		case 'FETCH_NEW':
			return {
				...state,
				newGames: action.payload.newGames,
				isNewBuffering: false
			};
		case 'FETCH_SEARCHED':
			return {
				...state,
				searched: action.payload.searched,
				isBuffering: false
			};
		case 'CLEAR_SEARCHED':
			return {
				...state,
				searched: [],
				isBuffering: true
			};

		default:
			return { ...state };
	}
};

export default gamesReducer;
