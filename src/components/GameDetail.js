import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { smallerImage } from '../utils';
import { v4 as uuidv4 } from 'uuid';

import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { appear, bounce } from '../animations';

export default function GameDetail({ pathId }) {
	const exitDetailHandler = (e) => {
		const element = e.target;
		if (element.classList.contains('shadow')) {
			setZoomIn(false);
			document.body.style.overflow = 'auto';
		}
	};


	const getStars = () => {
		const stars = [];
		const rating = Math.floor(game.rating);
		const decimalRating = game.rating - rating;
		for (let i = 1; i <= rating + 1; i++) {
			if (i <= rating) {
				stars.push(
					<FontAwesomeIcon className="star" key={uuidv4()} style={{ color: '#f03000' }} icon={faStar} size="2x" alt="logo" />
				);
			} else if (decimalRating > 0.25) {
				stars.push(
					<FontAwesomeIcon className="star"
						key={uuidv4()}
						style={{ color: '#f03000' }}
						icon={faStarHalfAlt}
						size="2x"
						alt="logo"
					/>
				);
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

	useEffect(
		() => {
			const getLocalGames = () => {
				JSON.parse(localStorage.getItem('game'));
				JSON.parse(localStorage.getItem('screen'));
			};
			getLocalGames();
		},
		[ game, screen ]
	);

	useEffect(
		() => {
			const saveLocalGames = () => {
				localStorage.setItem('game', JSON.stringify(game));
				localStorage.setItem('screen', JSON.stringify(screen));
			};
			saveLocalGames();
		},
		[ game, screen ]
	);

	const [ zoomIn, setZoomIn ] = useState(false);

	const zoomInHandler = () => {
		setZoomIn(true);
		document.body.style.overflow = 'hidden';
	};


	return (
		<div>
			{!isLoading && (
				<div>
					<CardContainer>
						<Detail variants={bounce} initial="hidden" animate="show" layoutId={pathId}>
							<Stats>
								<Rating>
									<motion.h3 layoutId={`title ${pathId}`}>
										{game.name}
									</motion.h3>
									<p>
										{game.metacritic === null ? '' : `Metascore: ${game.metacritic}`}
									</p>
									<p>{game.rating === 0 ? 'No Ratings' : `Rating: ${game.rating}`}</p>
									{getStars()}
								</Rating>
								<Info>
									<h3>Platforms available</h3>
									<Platforms>
										{!game.platforms.length ? (
											'No Information Provided'
										) : (
											game.platforms?.map((data) => (
												<img
													alt={data.platform.name}
													key={data.platform.id}
													src={getPlatform(data.platform.name)}
												/>
											))
										)}
									</Platforms>
								</Info>
							</Stats>

							<MainImage>
								{game.background_image === null ? (
									<h1>No Image Available</h1>
								) : (
									<motion.img
										layoutId={`image ${pathId}`}
										src={smallerImage(game.background_image, 1280)}
										alt="image"
									/>
								)}
							</MainImage>
							<Information>
								<p>{game.description_raw}</p>
							</Information>
							<Gallery>
								{screen.results?.map((screen) => (
									<img
										onClick={zoomInHandler}
										src={smallerImage(screen.image, 1280)}
										key={screen.id}
										alt="game"
									/>
								))}
							</Gallery>
						</Detail>
					</CardContainer>

					{zoomIn && (
						<PopUp
							variants={appear}
							initial="hidden"
							animate="show"
							className="shadow"
							onClick={exitDetailHandler}
						>
							<PopUpContent>
								{screen.results.map((screen) => (
									<img src={smallerImage(screen.image, 1280)} key={screen.id} alt="game" />
								))}
							</PopUpContent>
						</PopUp>
					)}
				</div>
			)}
		</div>
	);
}

const CardContainer = styled(motion.div)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  color: white;
  z-index: 10;
  img {
    width: 100%;
  }

@media (max-width: 900px) {
	width: 100%;
	padding: 0rem 1rem;
}
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }

  @media (max-width: 1350px) {
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: .5rem;
}

`;

const Rating = styled(motion.div)`
	h3 {
		font-size: 2.5rem;
	}

	p {
		color: lightgreen;
	}
		
		@media (max-width: 500px) {
			h3 {
			font-size: 1.5rem;
		}

		.star {
			font-size: 1.1rem;
		}
	}
`

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;

  img {  
	border: 1px solid white;
	background-color: white;
	border-radius: 25px;
  }

  img:not(:first-child){
	margin-left: 3rem;  

	@media (max-width: 500px) {
	margin-left: 1.5rem;
}
  }

`;

const MainImage = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
	border-radius: 15px;
  }
  text-align: center;

  @media (max-width: 700px) {
	margin-top: 2rem;
}
`;

const Gallery = styled(motion.div)`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
grid-column-gap: 3rem;
grid-row-gap: 5rem;
img {
	cursor: pointer;
	margin-bottom: 1rem;
	  border-radius: 10px;
}

@media (max-width: 550px) {
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-row-gap: 1.5rem;
}
`;

const Information = styled(motion.div)`
  margin: 5rem 0rem;

  @media (max-width: 900px) {
	p {
		font-size: 1rem;
	}
	margin: 2rem 0rem;
}
`;

const PopUp = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.5);
  margin-top: 3.9rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const PopUpContent = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 100;
  img {
    width: 100%;
	border-radius: 10px;
	margin-bottom: 1rem;
  }

  @media (max-width: 900px) {
	width: 90%;
	left: 5%;
	padding: 1rem 1rem;
  }
`;
