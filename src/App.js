import React, { useEffect } from 'react'
import './App.css';
import Header from './views/Header'
import Details from './views/Details';
import Watch from './views/Watch';
import Container from './views/Container';
import Error from './components/Error';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './views/Home';
import UpcomingSeason from './views/mobile/UpcomingSeason';
import Profile from './user/Profile';
import Register from './user/Register';
import Login from './user/Login';
import Logout from './user/Logout';
import Report from './user/Report';

function App() {
  // const history = useHistory()
  // const location = useLocation()
  useEffect( () => {
    // console.log(window.location.hostname)
    if (window.location.hostname==="senpaikouhai.github.io") {
      window.location.href = "https://www.senhai.cf"; 
    }
  }, [])
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          
          <Route path='/recentlyadded'>
            <Container page={'recentlyadded'} />
          </Route>
          <Route path='/popular'>
            <Container page={'popular'} />
          </Route>
          <Route path="/search">
            <Container page={'search'} />
          </Route>

          <Route path='/details'>
            <Details />
          </Route>
          <Route path="/watching/">
            <Watch />
          </Route>
          
          <Route path="/error">
            <Error />
          </Route>
          
          {/* user Route */}
          <Route path='/profile' >
            <Profile />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/report'>
            <Report />
          </Route>
          <Route path='/logout'>
            <Logout />
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
