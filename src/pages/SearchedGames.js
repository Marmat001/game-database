import React, { useEffect } from 'react';
import GamePageTemplate from './GamePageTemplate';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default function NewGames() {
	const { searched, isBuffering } = useSelector((state) => state.games);
	const history = useHistory();

	const onClickHandler = (e) => {
		e.preventDefault();
		history.push('/');
	};

	useEffect(
		() => {
			getLocalGames();
		},
		[ searched ]
	);

	useEffect(
		() => {
			saveLocalGames();
		},
		[ searched ]
	);

	const saveLocalGames = () => {
		localStorage.setItem('searched', JSON.stringify(searched));
	};

	const getLocalGames = () => {
		JSON.parse(localStorage.getItem('searched'));
	};

	return (
		<div>
			{isBuffering && <FetchingSearchMessage>Loading Results...</FetchingSearchMessage>}
			{!isBuffering && searched.length && <GamePageTemplate gameGenre={searched} title="Searched Games" />}
			{!isBuffering &&
			!searched.length && (
				<Container>
					<ErrorMessage style={{ color: 'red ' }}>No Results Found</ErrorMessage>{' '}
					<Button onClick={onClickHandler}>Try Again</Button>
				</Container>
			)}
		</div>
	);
}

const FetchingSearchMessage = styled.h1`
	font-size: 3rem;
	text-align: center;
	color: green;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;

const Container = styled.div`
	text-align: center;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;

const ErrorMessage = styled.h1`
	font-size: 3rem;
	color: white;
	margin-bottom: 2rem;
`;

const Button = styled.button`
	font-size: 1.5rem;
	border: none;
	padding: 0.5rem 2rem;
	cursor: pointer;
	background: #747cf5;
	color: white;
`;
