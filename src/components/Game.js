import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loadDetail } from '../actions/detailAction';
import { Link, useHistory } from 'react-router-dom';
import { smallImage } from '../utils';
import { fadeIn } from '../animations';
import NoImage from '../img/NoImage.png';

import { useLocation } from 'react-router-dom';


export default function Game({ name, released, image, id }) {
	const stringPathId = id.toString();
	const dispatch = useDispatch();
	const location = useLocation();

	const history = useHistory();

	const loadDetailHandler = () => {
		dispatch(loadDetail(id));
	};

	return (
		<StyledGame
			variants={fadeIn}
			initial="hidden"
			animate="show"
			layoutId={stringPathId}
			onClick={loadDetailHandler}
		>
			<Link to={`${location.pathname}/game/${id}`}>
				<motion.img
					layoutId={`image ${stringPathId}`}
					src={image === null ? smallImage(NoImage, 640) : smallImage(image, 640)}
					alt={name}
				/>
				<motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
				<p>Release Date: {released}</p>
			</Link>
		</StyledGame>
	);
}

const StyledGame = styled(motion.div)`
	min-height: 30vh;
	box-shadow: 0px 5px 20px rgba(0,0,0,0.2);
	text-align: center;
	border-radius: 1rem;
	cursor: pointer;
	overflow: hidden;
	background-color: white;
	img {
		width: 100%;
		height: 40vh;
		object-fit: cover;
	}

	h3 {
		color: black;
	}

	p {
		color: black;
		margin-bottom: 1rem;
	}
`;
