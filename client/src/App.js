import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import CssBaseline from '@mui/material/CssBaseline';
import background from './assets/images/logo.jpg';

import './App.css';

function App() {
  return (
    <div className="main">
      <div
        className="main__bg"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <CssBaseline />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
