import React from 'react';
import GamePageTemplate from './GamePageTemplate';
import { useSelector } from 'react-redux';
import { loadNew } from '../actions/gamesAction';

export default function NewGames() {
	const { newGames, isNewBuffering } = useSelector((state) => state.games);

	return (
		<GamePageTemplate gameGenre={newGames} title="New Games" fetchGames={loadNew()} isBuffering={isNewBuffering} />
	);
}
