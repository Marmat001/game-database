import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { smallerImage } from '../utils';
import NoImage from '../img/NoImage.png';
import { loadDetail } from '../actions/detailAction';
import { useDispatch } from 'react-redux';

export default function DropDown({ name, image, id }) {
	const stringPathId = id.toString();
	const dispatch = useDispatch();

	const loadDetailHandler = () => {
		dispatch(loadDetail(id));
	};

	return (
		<GameContainer onClick={loadDetailHandler}>
			<Link className="linkstyle" to={`/searched-games/game/${id}`}>
				<img
					layoutid={`image ${stringPathId}`}
					src={image === null ? smallerImage(NoImage, 640) : smallerImage(image, 640)}
					alt={name}
				/>
				<h4 layoutid={`title ${stringPathId}`}>{name}</h4>
			</Link>
		</GameContainer>
	);
}

const GameContainer = styled.div`
	max-height: 30vh;
	border-radius: 1rem;
	cursor: pointer;
	background-color: white;
	
	.linkstyle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		img {
		width: 25%;
		height: 100%;
		object-fit: cover;
	}

	h4 {
		font-size: 1.2rem;
		color: black;
		padding-right: 1rem;
	}
	}
	
`;
