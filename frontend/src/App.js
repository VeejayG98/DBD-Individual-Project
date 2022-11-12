import { Routes, Route, useNavigate } from 'react-router-dom';
import CheckIn from './CheckIn';
import Home from './Home';
import ViewFines from './ViewFines';

function App(){
    return(
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/checkin' element={<CheckIn />}></Route>
        <Route path='/view-fines' element={<ViewFines />}></Route>
      </Routes>  
    );
}
export default App;