import { Routes, Route, useNavigate } from 'react-router-dom';
import CheckIn from './CheckIn';
import Home from './Home';

function App(){
    return(
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/checkin' element={<CheckIn />}></Route>
      </Routes>  
    );
}
export default App;