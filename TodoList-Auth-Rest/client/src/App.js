import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './screens/Dashboard';

import {
  BrowserRouter ,
  Routes,
  Route
} from 'react-router-dom';
import Profile from './screens/Profile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='/' element={<Login /> }/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
