import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { smallerImage } from '../utils';
import NoImage from '../img/NoImage.png';

import { useLocation } from 'react-router-dom';
import { loadDetail } from '../actions/detailAction';
import { useDispatch } from 'react-redux';

export default function DropDown({ name, image, id }) {
	const stringPathId = id.toString();
	const dispatch = useDispatch();

	const location = useLocation();

	const loadDetailHandler = () => {
		dispatch(loadDetail(id));
	};

	return (
		<GameContainer onClick={loadDetailHandler}>
			<Link to={`${location.pathname}/game/${id}`}>
				<img
					layoutId={`image ${stringPathId}`}
					src={image === null ? smallerImage(NoImage, 640) : smallerImage(image, 640)}
					alt={name}
				/>
				<h3 layoutId={`title ${stringPathId}`}>{name}</h3>
			</Link>
		</GameContainer>
	);
}

const GameContainer = styled.div`
	height: 10vh;
	border-radius: 1rem;
	cursor: pointer;
	background-color: white;

	text-align: right;
	img {
		width: 25%;
		height: 100%;
		object-fit: cover;
	}

	h3 {
		color: black;
		padding-right: 1rem;
		margin-top: -5.4rem;
	}
`;
