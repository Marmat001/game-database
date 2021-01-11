const initialState = {
	game: JSON.parse(localStorage.getItem('game')) || [],
	screen: JSON.parse(localStorage.getItem('screen')) || [],
	isLoading: 'game'.length ? false : true
};

const detailReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_DETAIL':
			return {
				...state,
				game: action.payload.game,
				screen: action.payload.screen,
				isLoading: false
			};
		case 'LOADING_DETAIL':
			return {
				...state,
				isLoading: true
			};
		default:
			return { ...state };
	}
};

export default detailReducer;
