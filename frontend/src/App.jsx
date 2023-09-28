import Login from "./components/Login";
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomeLogged from "./components/HomeLogged";
import { AuthContext } from "./auth/context/AuthContext";
import { useContext } from "react";




const App = () => {
	
	const {isAuth, setIsAuth} = useContext(AuthContext);
 
  return (
    <BrowserRouter>
		
	  <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={isAuth ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={isAuth ? <HomeLogged /> : <Navigate to="/login" />} />
      </Routes>
      
       
    </BrowserRouter>
  )
}

export default App


