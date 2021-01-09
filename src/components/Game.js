import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loadDetail } from '../actions/detailAction';
import { Link } from 'react-router-dom';
import { smallImage } from '../utils';
import { popup } from '../animations';
import NoImage from '../img/NoImage.png';

import { useLocation } from 'react-router-dom';

export default function Game({ name, released, image, id }) {
	const stringPathId = id.toString();
	const dispatch = useDispatch();
	const location = useLocation();

	const loadDetailHandler = () => {
		document.body.style.overflow = 'hidden';
		dispatch(loadDetail(id));
	};

	return (
		<StyledGame
			// variants={popup}
			// initial="hidden"
			// animate="show"
			layoutId={stringPathId}
			onClick={loadDetailHandler}
		>
			<Link to={`${location.pathname}/game/${id}`}>
				<motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
				<p>{released}</p>
				<motion.img
					layoutId={`image ${stringPathId}`}
					src={image === null ? smallImage(NoImage, 640) : smallImage(image, 640)}
					alt={name}
				/>
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
`;
