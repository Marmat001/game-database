import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { smallImage } from '../utils';

import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
//Star Images
import starEmpty from '../img/star-empty.png';
import starFull from '../img/star-full.png';

import { fadeIn, popup } from '../animations';

export default function GameDetail({ pathId }) {
	const history = useHistory();
	const { pathname } = useLocation();

	// const exitDetailHandler = (e) => {
	// 	const element = e.target;
	// 	if (element.classList.contains('shadow')) {
	// 		document.body.style.overflow = 'auto';
	// 		history.goBack();
	// 	}
	// };





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
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(<img style={{ color: 'white ' }} alt="star" key={i} src={starFull} />);
			} else {
				stars.push(<img alt="star" key={i} src={starEmpty} />);
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
					// variants={fadeIn}
					// initial="hidden"
					// animate="show"
					className="shadow"
				>
					<Detail layoutId={pathId}>
						<Stats>
							<div className="rating">
								<motion.h3 style={{ fontSize: '2.5rem' }} layoutId={`title ${pathId}`}>
									{game.name}
								</motion.h3>
								<p>Rating: {game.rating}</p>
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
						<div className="gallery">
							{screen.results?.map((screen) => (
								<img src={smallImage(screen.image, 1280)} key={screen.id} alt="game" />
							))}
						</div>
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
  left: 10%;
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
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;
