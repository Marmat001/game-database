import React, { useEffect } from 'react';
import GameDetail from '../components/GameDetail';

import Game from '../components/Game';

import styled from 'styled-components';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function GamePageTemplate({ gameGenre, title, fetchGames, isBuffering }) {
	const location = useLocation();
	const pathId = location.pathname.split('/')[2];
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (fetchGames) {
				dispatch(fetchGames);
			}
		},
		[ dispatch ]
	);

	return (
		<div>
			{isBuffering && <LoadingMessage>Loading Results...</LoadingMessage>}
			{!isBuffering && (
				<GameList>
					<AnimateSharedLayout type="crossfade">
						<AnimatePresence>{pathId && <GameDetail pathId={pathId} />}</AnimatePresence>
						<h2>{title}</h2>
						<Games>
							{gameGenre.map((game) => (
								<Game
									name={game.name}
									released={game.released}
									id={game.id}
									image={game.background_image}
									key={game.id}
								/>
							))}
						</Games>
					</AnimateSharedLayout>
				</GameList>
			)}
		</div>
	);
}

const GameList = styled(motion.div)`
    padding: 0rem 5rem;
    h2 {
        padding: 5rem 0rem;
    }
	
	@media (max-width: 1200px) {
		padding: 0rem 3rem;
		h2 {
        padding: 2.5rem 0rem;
    }
  }

	@media (max-width: 490px) {
		padding: 0rem 1.5rem;
		h2 {
        font-size: 1.4rem;
		padding: 1.5rem 0rem;
    }
	}
`;

const Games = styled(motion.div)`
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 5rem;



	@media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }

  @media (max-width: 500px) {
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  

 
`;

const LoadingMessage = styled.h1`
	font-size: 3rem;
	text-align: center;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;

	@media (max-width: 500px) {
	font-size: 2rem;
  }
`;
