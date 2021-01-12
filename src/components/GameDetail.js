import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { smallImage } from '../utils';
import { v4 as uuidv4 } from 'uuid';


import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
//Star Images


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { popup } from '../animations';

export default function GameDetail({ pathId }) {
	const history = useHistory();
	const { pathname } = useLocation();

	





	const saveLocalGames = () => {
		localStorage.setItem('game', JSON.stringify(game));
		localStorage.setItem('screen', JSON.stringify(screen));
	};

	const getLocalGames = () => {
		JSON.parse(localStorage.getItem('game'));
		JSON.parse(localStorage.getItem('screen'));
	};

	const getStars = () => {
		const stars = [];
		const rating = Math.floor(game.rating);
		const decimalRating = game.rating - rating;
		for (let i = 1; i <= rating + 1; i++) {
			if (i <= rating) {
				stars.push(<FontAwesomeIcon key={uuidv4()} style={{color: "#f03000"}} icon={faStar} size="2x" alt="logo" />);
			} else if (decimalRating > 0.25) {
				stars.push(<FontAwesomeIcon key={uuidv4()} style={{color: "#f03000"}} icon={faStarHalfAlt} size="2x" alt="logo" />);
			} 
		}
		return stars;
	};

	const getPlatform = (platform) => {
		switch (platform) {
			case 'PlayStation 4':
				return playstation;
			case 'Xbox One':
				return xbox;
			case 'PC':
				return steam;
			case 'Nintendo Switch':
				return nintendo;
			case 'iOS':
				return apple;
			default:
				return gamepad;
		}
	};

	const { screen, game, isLoading } = useSelector((state) => state.detail);



	useEffect(() => {
		if (!pathname.includes('game/')) {
			getLocalGames();
			
		}
	}, [game, screen]);


	useEffect(() => {
		if (pathname.includes('game/')) {
			saveLocalGames();
			
		}
	}, [game, screen]);
	return (
		<div>
			{!isLoading && (
				<CardShadow
					variants={popup}
					initial="hidden"
					animate="show"
					className="shadow"
				>
					<Detail layoutId={pathId}>
						<Stats>
							<div className="rating">
								<motion.h3 style={{ fontSize: '2.5rem' }} layoutId={`title ${pathId}`}>
									{game.name}
								</motion.h3>
								<p style={{color: "lightgreen"}}>{game.metacritic === null ? "" : `Metascore: ${game.metacritic}` }</p>
								<p>{game.rating === 0 ? "Not Rated Yet" : `Rating: ${game.rating}` }</p>
								{getStars()}
							</div>
							<Info>
								<h3>Platforms available</h3>
								<Platforms>
									{game.platforms?.map((data) => (
										<img
											alt={data.platform.name}
											key={data.platform.id}
											src={getPlatform(data.platform.name)}
										/>
									))}
								</Platforms>
							</Info>
						</Stats>

						<Media>
							<motion.img
								layoutId={`image ${pathId}`}
								src={smallImage(game.background_image, 1280)}
								alt="image"
							/>
						</Media>
						<Description>
							<p>{game.description_raw}</p>
						</Description>
						<Gallery>
							{screen.results?.map((screen) => (
								<img src={smallImage(screen.image, 1280)} key={screen.id} alt="game" />
							))}
						</Gallery>
					</Detail>
				</CardShadow>
			)}
		</div>
	);
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
 
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  position: absolute;
  left: 9%;
  color: white;
  z-index: 10;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
	border: 1px solid white;
	background-color: white;
	border-radius: 25px;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
	border-radius: 15px;
  }
`;



const Gallery = styled(motion.div)`
  img {
	  margin-bottom: 1rem;
	  border-radius: 10px;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;
