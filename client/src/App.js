import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import CssBaseline from '@mui/material/CssBaseline';
import background from './assets/images/logo.png';

import './App.css';

function App () {
  return (
    <div className="main" style={{ backgroundImage: `url(${background})` }}>
      <CssBaseline />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
