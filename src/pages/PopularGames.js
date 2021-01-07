import React from 'react';
import GamePageTemplate from './GamePageTemplate';
import { useSelector } from 'react-redux';
import { loadPopular } from '../actions/gamesAction';

export default function NewGames() {
	const { popular, isPopularBuffering } = useSelector((state) => state.games);

	return (
		<GamePageTemplate
			gameGenre={popular}
			title="Popular Games"
			fetchGames={loadPopular()}
			isBuffering={isPopularBuffering}
		/>
	);
}
