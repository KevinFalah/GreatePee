import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

import { API, setAuthToken } from './config/api';

// import pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import MyProduct from './pages/MyProduct';
import { useContext, useEffect } from 'react';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);
  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }
  
  //    // Redirect Auth
  //    if (state.isLogin === false) {
  //     navigate('/');
  //   } else {
  //     if (state.user.status === 'admin') {
  //       navigate('/product-admin');
  //     } else if (state.user.status === 'customer') {
  //       navigate('/');
  //     }
  //   }
  // }, [state]);

  

  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myproduct" element={<MyProduct />} />
      </Routes>
  );
}

export default App;
