import SearchedGames from './pages/SearchedGames';
import GlobalStyles from './components/GlobalStyles';
import { Route, Switch, useLocation } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import Nav from './components/Nav';
import NewGames from './pages/NewGames';
import UpcomingGames from './pages/UpcomingGames';
import PopularGames from './pages/PopularGames';

import ScrollTop from './components/ScrollTop';
import GameDetail from './components/GameDetail';
import Game from './components/Game';

function App() {
	const location = useLocation();

	return (
		<div className="App">
			<GlobalStyles />
			<ScrollTop />
			<Nav />
			<Switch location={location} key={location.pathname}>
				<Route exact path="/">
					<FirstPage />
				</Route>
				<Route exact path="/searched-games">
					<SearchedGames />
				</Route>
				<Route exact path="/new-games">
					<NewGames />
				</Route>
				<Route exact path="/upcoming-games">
					<UpcomingGames />
				</Route>

				<Route exact path="/popular-games">
					<PopularGames />
				</Route>

				<Route
					path={[
						'/searched-games/game/:id',
						'/new-games/game/:id',
						'/upcoming-games/game/:id',
						'/popular-games/game/:id'
					]}
				>
					<GameDetail />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
