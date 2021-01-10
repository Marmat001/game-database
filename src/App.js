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
				<Route path={[ 'searched-games/game/:id', '/searched-games' ]}>
					<SearchedGames />
				</Route>

				<Route path={[ 'new-games/game/:id', '/new-games' ]}>
					<NewGames />
				</Route>

				<Route path={[ 'upcoming-games/game/:id', '/upcoming-games' ]}>
					<UpcomingGames />
				</Route>

				<Route path={[ 'popular-games/game/:id', '/popular-games' ]}>
					<PopularGames />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
