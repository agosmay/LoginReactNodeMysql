import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
	
	return (
		<>
			<h1>Soy el home</h1>
			<Link to="/login">Haz click aqui para loguearte</Link>
			<br />
			<Link to="/signup">Haz click aqui para registrarte</Link>
		</>
	
	
	);
	
}




export default Home; 