import axios from 'axios';
import { popularGamesURL, upcomingGamesURL, newGamesURL, searchGameURL } from '../api';

//Action Creator

export const loadPopular = () => async (dispatch) => {
	//FETCH AXIOS
	const popularData = await axios.get(popularGamesURL());
	dispatch({
		type: 'FETCH_POPULAR',
		payload: {
			popular: popularData.data.results
		}
	});
};

export const loadUpcoming = () => async (dispatch) => {
	//FETCH AXIOS
	const upcomingData = await axios.get(upcomingGamesURL());
	dispatch({
		type: 'FETCH_UPCOMING',
		payload: {
			upcoming: upcomingData.data.results
		}
	});
};

export const loadNew = () => async (dispatch) => {
	//FETCH AXIOS

	const newGamesData = await axios.get(newGamesURL());

	dispatch({
		type: 'FETCH_NEW',
		payload: {
			newGames: newGamesData.data.results
		}
	});
};

export const fetchSearch = (game_name) => async (dispatch) => {
	const searchGames = await axios.get(searchGameURL(game_name));
	dispatch({
		type: 'FETCH_SEARCHED',
		payload: {
			searched: searchGames.data.results
		}
	});
};
