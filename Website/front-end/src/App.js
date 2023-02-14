import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Selection from './components/Selection';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact component={Home} />
            <Route path='/sign-up' component={SignUp} />
          </Routes>
        </Router>
        
        <Selection> </Selection>
      </>
    )
  }
}

export default App;