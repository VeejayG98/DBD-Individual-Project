import { Routes, Route, useNavigate } from 'react-router-dom';
import BorrowerSignup from './BorrowerSignup';
import CheckIn from './CheckIn';
import Home from './Home';
import PayFines from './PayFines';
import ViewFines from './ViewFines';

function App(){
    return(
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/checkin' element={<CheckIn />}></Route>
        <Route path='/view-fines' element={<ViewFines />}></Route>
        <Route path='borrowers/signup' element={<BorrowerSignup />}></Route>
        <Route path='/payment/fines' element={<PayFines />}></Route>
      </Routes>  
    );
}
export default App;