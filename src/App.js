import SearchedGames from './pages/SearchedGames';
import GlobalStyles from './components/GlobalStyles';
import { Route, Switch, useLocation } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import Nav from './components/Nav';
import NewGames from './pages/NewGames';
import UpcomingGames from './pages/UpcomingGames';
import PopularGames from './pages/PopularGames';

function App() {
	const location = useLocation();

	return (
		<div className="App">
			<GlobalStyles />
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

				{/* <Route path={[ '/game/:id', '/' ]}>
					<FirstPage />
				</Route> */}
			</Switch>
		</div>
	);
}

export default App;
