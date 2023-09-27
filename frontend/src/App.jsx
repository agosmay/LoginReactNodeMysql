import Login from "./components/Login";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomeLogged from "./components/HomeLogged";



const App = () => {
 
  return (
    <BrowserRouter>
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/signup"
				element={<Signup />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/home"
				element={<HomeLogged />}
			/>
		</Routes>
      
       
    </BrowserRouter>
  )
}

export default App
