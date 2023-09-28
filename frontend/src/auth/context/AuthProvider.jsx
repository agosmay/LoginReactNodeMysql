import { AuthContext } from "./AuthContext";
import { useState } from "react";



export const AuthProvider = ( { children } ) => {
	
	const [isAuth, setIsAuth]= useState(false);
	
	
	
	return (
		<AuthContext.Provider value= {{
			isAuth,
			setIsAuth
			
			
		}}>
		
		
		
		{children}
		
		
		</AuthContext.Provider>
	
	
	);
	
	
}


