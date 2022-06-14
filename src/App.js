import './App.css';
import InsertEpisode from './InsertEpisode'
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import SideBar from './SideBar';
import InsertAlbem from './InsertAlbem';
function App() {
  return (
    <Router>
      <main className='app'>
      <Routes>
        <Route path='/' element={<><SideBar /> <InsertEpisode /></>} />
        <Route path='/Insert_Albem' element={<><SideBar /> <InsertAlbem /></>} />
      </Routes>
      </main>

    </Router>
  );
}

export default App;
