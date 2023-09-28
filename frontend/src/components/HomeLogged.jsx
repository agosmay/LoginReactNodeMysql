import React , { useContext } from "react";
import Busqueda from "./Busqueda";
import { AuthContext } from "../auth/context/AuthContext";




const HomeLogged = () => {
	
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const handleClick = () => {
		setIsAuth(false);
		
	}
	
	return (
		<>
			<h1>Soy el home de los loggeados</h1>
			<Busqueda />
			<button className="btn btn-danger" onClick={handleClick}>Logout</button>
			
		</>
	
	
	);
	
}




export default HomeLogged; 