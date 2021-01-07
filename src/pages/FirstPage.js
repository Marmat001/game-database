import React, { useState } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import { fetchSearch } from '../actions/gamesAction';
import { useDispatch } from 'react-redux';
import { fadeIn } from '../animations';
import Particles from 'react-particles-js';

import { useHistory } from 'react-router-dom';

const FirstPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ textInput, setTextInput ] = useState('');

	const inputHandler = (e) => {
		setTextInput(e.target.value);
	};

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
		<StyledContainer variants={fadeIn} initial="hidden" animate="show">
			<Particles style={particlesStyle} params={particlesOptions} />
			<Logo>
				<FontAwesomeIcon icon={faDatabase} size="8x" alt="logo" />
				<h1>Internet Game Database </h1>
			</Logo>
			<form className="search" style={{ zIndex: 2 }}>
				<input value={textInput} onChange={inputHandler} type="text" />
				<button onClick={submitSearch} type="submit">
					Submit
				</button>
			</form>
		</StyledContainer>
	);
};

const StyledContainer = styled(motion.nav)`
height: 90vh;
padding: 3rem 5rem;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;





input {
  width: 30%;
  font-size: 1.5rem;
  padding: 0.5rem;
  border: none;
  margin-top: 1rem;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);

}
button {
  font-size: 1.5rem;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  background: #747CF5;
  color: white;

}
`;

const Logo = styled(motion.div)`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

padding: 1rem;
h1 {
  color: white;
  font-size: 2rem;
 
}
svg {
margin-bottom: 2rem;
  color: white;

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
