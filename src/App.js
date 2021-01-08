import './App.css';
// import Popular from './views/Popular'
// import Recent from './components/Recent';
// import Search from './views/Search';
import Header from './views/Header'
import Details from './views/Details';
import Watch from './views/Watch';
import Container from './views/Container';
import Error from './components/Error';
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './views/Home';

function App() {
  return (
    <div className="App">
      {/* <Recent /> */}
      {/* <Details /> */}
      <Router>
      <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/new'>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
