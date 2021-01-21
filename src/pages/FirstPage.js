import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import { fetchSearch } from '../actions/gamesAction';
import { useDispatch, useSelector } from 'react-redux';
import { revealIn } from '../animations';
import Particles from 'react-particles-js';

import { useHistory } from 'react-router-dom';
import DropDown from '../components/DropDown';

const FirstPage = () => {
	const { searched } = useSelector((state) => state.games);

	const dispatch = useDispatch();
	const history = useHistory();

	const [ textInput, setTextInput ] = useState('');

	useEffect(
		() => {
			const delay = setTimeout(() => {
				dispatch(fetchSearch(textInput));
			}, 500);
			return () => {
				clearTimeout(delay);
			};
		},
		[ textInput ]
	);

	const particlesOptions = {
		particles: {
			number: {
				value: 50,
				density: {
					enable: true,
					value_area: 800
				}
			}
		}
	};

	const submitSearch = (e) => {
		e.preventDefault();
		if (textInput.length) {
			dispatch(fetchSearch(textInput));
			setTextInput('');
			history.push('/searched-games');
			dispatch({ type: 'CLEAR_SEARCHED' });
		}
	};

	return (
		<StyledContainer variants={revealIn} initial="hidden" animate="show">
			<Particles style={particlesStyle} params={particlesOptions} />
			<Logo>
				<FontAwesomeIcon icon={faDatabase} size="8x" alt="logo" />
				<h1>Internet Game Database </h1>
			</Logo>
			<form>
				<input
					type="text"
					value={textInput}
					onChange={(e) => setTextInput(e.target.value)}
					placeholder="Type To Search"
				/>
				<button onClick={submitSearch}>Search</button>
			</form>
			{textInput && (
				<Dropmenu>
					{searched.map((game) => (
						<DropDown name={game.name} id={game.id} image={game.background_image} key={game.id} />
					))}
				</Dropmenu>
			)}
		</StyledContainer>
	);
};

const StyledContainer = styled(motion.nav)`
height: 90vh;
padding: 3rem 5rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

input {
 font-size: 1.5rem;
 padding: .5rem;
 width: 70%;

 @media (max-width: 1200px) {
	font-size: 1.2rem;
	width: 100%;
	
	}
}

button {
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  background: #747CF5;
  color: white;
  width: 25%;

 transition: all .2s ease-in-out; 

 :hover { 
	 transform: scale(1.1); 
	    }

	@media (max-width: 1200px) {
	font-size: 1.2rem;
	padding: .5rem 1rem;
	}

	@media (max-width: 800px) {
	width: 40%;	
	}


}

form {
  display: flex;
  justify-content: center;
  width: 40vw;
  z-index: 5;
  background:
  radial-gradient(circle farthest-side at 0% 50%,#fb1 23.5%,rgba(240,166,17,0) 0)21px 30px,
  radial-gradient(circle farthest-side at 0% 50%,#B71 24%,rgba(240,166,17,0) 0)19px 30px,
  linear-gradient(#fb1 14%,rgba(240,166,17,0) 0, rgba(240,166,17,0) 85%,#fb1 0)0 0,
  linear-gradient(150deg,#fb1 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,#fb1 0)0 0,
  linear-gradient(30deg,#fb1 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,#fb1 0)0 0,
  linear-gradient(90deg,#B71 2%,#fb1 0,#fb1 98%,#B71 0%)0 0 #fb1;
  background-size:40px 60px;
  padding: 1rem;
  box-shadow: 0 0 5px 5px  #fb1 ;

  @media (max-width: 1000px) {
	  width: 60vw;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	
	}

	@media (max-width: 550px) {
		width: 85vw;	
	}


} 
`;

const Logo = styled(motion.div)`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
z-index: 8;
padding: 1rem;
width: 80vw;
h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 500px) {
	font-size: 1.2rem;
	margin-bottom: 2rem;
	}

}
svg {
margin-bottom: 2rem;
  color: white;
}
`;

const Dropmenu = styled(motion.div)`
  width: 40vw;
  max-height: 40vh;
  overflow-y: scroll;
  z-index: 10;
  border: 4px double #FFC248;

  @media (max-width: 1000px) {
	  width: 50vw;
	  /* width: 0%;
	  height: 0%;
	  opacity: 0; */
	}
 
`;

const particlesStyle = {
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
};

export default FirstPage;
