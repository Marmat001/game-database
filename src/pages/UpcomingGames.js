import React from 'react';
import GamePageTemplate from './GamePageTemplate';
import { useSelector } from 'react-redux';
import { loadUpcoming } from '../actions/gamesAction';

export default function NewGames() {
	const { upcoming, isUpcomingBuffering } = useSelector((state) => state.games);

	return (
		<GamePageTemplate
			gameGenre={upcoming}
			title="Upcoming Games"
			fetchGames={loadUpcoming()}
			isBuffering={isUpcomingBuffering}
		/>
	);
}
