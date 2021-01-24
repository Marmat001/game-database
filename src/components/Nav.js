import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Nav = () => {
	const { pathname } = useLocation();

	return (
		<StyledNav>
			<h1>
				<Link id="logo" to="/">
					The Ultimate Search Experience
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="/new-games">New Games</Link>
					<Line
						transition={{ duration: 0.75 }}
						initial={{ width: '-10%' }}
						animate={{ width: pathname.includes(`/new-games`) ? '55%' : '0%' }}
					/>
				</li>
				<li>
					<Link to="/upcoming-games">Upcoming Games</Link>
					<Line
						transition={{ duration: 0.75 }}
						initial={{ width: '-10%' }}
						animate={{ width: pathname.includes('/upcoming-games') ? '50%' : '0%' }}
					/>
				</li>
				<li>
					<Link to="/popular-games">Popular Games</Link>
					<Line
						transition={{ duration: 0.75 }}
						initial={{ width: '-10%' }}
						animate={{ width: pathname.includes('/popular-games') ? '50%' : '0%' }}
					/>
				</li>
			</ul>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	min-height: 10vh;
	display: flex;
	margin: auto;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 10rem;
	background: #747cf5;
	position: sticky;
	top: 0;
	z-index: 100;
	a {
		color: white;
		text-decoration: none;
	}
	ul {
		display: flex;
		list-style: none;
	}
	#logo {
		font-size: 1.5rem;
		font-family: "Lobster", cursive;
		font-weight: lighter;
	}
	li {
		padding-left: 10rem;
		position: relative;
	}

	@media (max-width: 1460px) {
		flex-direction: column;
		padding: 1rem 0rem;
		#logo {
			font-size: 1rem;
		}
		ul {
			padding: 1rem;
			justify-content: space-around;
			width: 100%;
			li {
				padding: 0;
			}
		}
	}

	@media (max-width: 500px) {
		padding: 0;
		#logo {
			font-size: .8rem;
		}

		li {
			font-size: 0.7rem;
		}
	}
`;

const Line = styled(motion.div)`
  height: 0.3rem;
  background: #EE4C6C;
  width: 0%;
  position: absolute;
  bottom: -80%;
  left: 55%;
  @media (max-width: 1460px) {
    left: 0%;
  }
`;

export default Nav;
