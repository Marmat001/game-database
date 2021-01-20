import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loadDetail } from '../actions/detailAction';
import { Link } from 'react-router-dom';
import { smallerImage } from '../utils';
import { revealIn } from '../animations';
import NoImage from '../img/NoImage.png';

import { useLocation } from 'react-router-dom';

export default function Game({ name, released, image, id }) {
	const stringPathId = id.toString();
	const dispatch = useDispatch();
	const location = useLocation();

	const loadDetailHandler = () => {
		dispatch(loadDetail(id));
	};

	return (
		<GameContainer
			variants={revealIn}
			initial="hidden"
			animate="show"
			layoutId={stringPathId}
			onClick={loadDetailHandler}
		>
			<Link to={`${location.pathname}/game/${id}`}>
				<motion.img
					layoutId={`image ${stringPathId}`}
					src={image === null ? smallerImage(NoImage, 640) : smallerImage(image, 640)}
					alt={name}
				/>
				<motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
				<p>Release Date: {released}</p>
			</Link>
		</GameContainer>
	);
}

const GameContainer = styled(motion.div)`
	min-height: 30vh;
	box-shadow: 0px 5px 20px rgba(0,0,0,0.2);
	text-align: center;
	border-radius: 1rem;
	cursor: pointer;
	overflow: hidden;
	background-color: white;


	/* @media (max-width: 550px) {
			width: 80vw;
		} */

	img {
		width: 100%;
		height: 40vh;
		object-fit: cover;

		@media (max-width: 550px) {
			height: 30vh;
		}
	}

	h3 {
		color: black;
	}

	p {
		color: black;
		margin-bottom: 1rem;
	}

	@media (max-width: 800px) {
		h3 {
			font-size: 1.1rem;
			padding: 0.75rem;

		}
		p {
			margin-bottom: 0rem;
			font-size: 90%;
		}
  }

  @media (max-width: 500px) {
	h3 {
		font-size: 1rem;
		padding: 0.5rem;
	}
	p    {
		font-size: 85%;
		}
}
`;
