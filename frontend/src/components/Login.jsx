import { useState } from "react";
import { Link } from "react-router-dom";
import LoginValidation from "../LoginValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
	const [values, setValues] = useState({
			email:"",
			password:""
		
		
	});
	
	const navigate = useNavigate();
	
	
	const [errors , setErrors] = useState({});
	
	const handleChange = (e) => {
		
		setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
		
	}
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(LoginValidation(values));
		if(errors.email ==="" && errors.password ==="") {
			axios.post("http://localhost:3000/login" , values) 
			.then(res=> {
				if(res.data === "Success") {
					navigate("/home")
					
					
				}else {
					
					alert("Credentials do not match");
					
				}
				
			})
			.catch(err => console.log(err))
			
		}
		
	}
	
	
	return (
	
		
			<div className="d-flex justify-content-center align-items-center bg-primary vh-100">
				<div className="bg-white p-3 rounded w-25">
					<h4 className="text-center">Log In</h4>
					<form action="" method="POST" onSubmit ={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="email"><strong>Email</strong></label>
							<input type="email" placeholder="Enter Email" className="form-control rounded-0" onChange={handleChange}
							name="email" value={values.email}/>
							{errors.email && <span className="text-danger">{errors.email}</span>}
						</div>
						<div className="mb-3">
							<label htmlFor="password"><strong>Password</strong></label>
							<input type="password" placeholder="Enter Password" className="form-control rounded-0" onChange={handleChange} 
							name="password" value={values.password}/>
							{errors.password && <span className="text-danger">{errors.password}</span>}
						</div>
						<button className="btn btn-success w-100 rounded-0" type="submit"><strong>Log In</strong></button>
						<p>You are agree to out terms and policies</p>
						<Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0" type="submit">Create Account</Link>
					</form>
				</div>
			</div>
		
	
	);
	
}

export default Login;
