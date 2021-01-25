import './App.css';
import Header from './views/Header'
import Details from './views/Details';
import Watch from './views/Watch';
import Container from './views/Container';
import Error from './components/Error';
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './views/Home';
import UpcomingSeason from './views/mobile/UpcomingSeason';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route exact path='/'>
            {/* <MangadexApi /> */}
            <Home />
          </Route>

          <Route path='/recentlyadded'>
            <Container page={'recentlyadded'} />
          </Route>

          <Route path='/popular'>
            <Container page={'popular'} />
          </Route>

          <Route path='/details'>
            <Details />
          </Route>

          <Route path="/watching/">
            <Watch />
          </Route>

          <Route path="/search">
            <Container page={'search'} />
          </Route>

          <Route path="/error">
            <Error />
          </Route>
          
          {/* Mobile Views */}
          
          <Route path='/upcoming'>
            <UpcomingSeason />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
