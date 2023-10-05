import { useState } from "react";
import { Link } from "react-router-dom";
import LoginValidation from "../LoginValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState("password"); // Estado para controlar el tipo de entrada de contraseña
  const [loginError, setLoginError] = useState(""); // Estado para controlar el mensaje de error de inicio de sesión

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { isAuth, setIsAuth } = useContext(AuthContext);

   
const handleChange = (e) => {
  setLoginError("");

  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  let errorMessage = "";

  if (fieldName === "password") {
    if (fieldValue.trim() === "") {
      errorMessage = ""; // Campo vacío, no mostrar error
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(fieldValue)
    ) {
      errorMessage = "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.";
    }
  } else if (fieldName === "email") {
    if (fieldValue.trim() === "") {
      errorMessage = ""; // Campo vacío, no mostrar error
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
      errorMessage = "Please include an '@' symbol in the email address and enter text after the '@' symbol followed by a valid domain (e.g., .com)";
    } else {
      const [localPart, domainPart] = fieldValue.split('@');
      if (localPart.length < 1 || localPart.length > 64) {
        errorMessage = "Email address should have between 1 and 64 characters before the '@' symbol";
      } else if (!/^[a-z0-9_.-]+$/.test(localPart)) {
        errorMessage = "Only letters (a-z) and special characters like '.', '-', and '_' are allowed before the '@' symbol";
      } else if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
        errorMessage = "Invalid placement of periods (.) in the local part of the email address";
      } else if (localPart.startsWith('--') || localPart.endsWith('--') || localPart.includes('--')) {
        errorMessage = "Invalid placement of periods (-) in the local part of the email address";
      }

      // Nueva validación: No permitir mayúsculas antes ni después del símbolo '@'
      if (/[A-Z]/.test(localPart) || /[A-Z]/.test(domainPart)) {
        errorMessage = "Only letters (a-z) and special characters like '.', '-', and '_' are allowed before the '@' symbol";
      }
    }
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: errorMessage,
  }));

  setValues((prevValues) => ({
    ...prevValues,
    [fieldName]: fieldValue,
  }));
};




  
  const handleSubmit = (e) => {
    e.preventDefault();
	const err = LoginValidation(values);
    setErrors(err);
		if(err.email ==="" && err.password ==="") {
    axios
      .post("http://localhost:3000/login", values)
      .then((res) => {
        if (res.data === "Success") {
          setIsAuth(true);
          navigate("/home");
        } else {
          setIsAuth(false);
		  setValues({
            email: "",
            password: ""
          });
          setLoginError("Credentials do not match :("); // Establece el mensaje de error
		  
        }
      })
      .catch((err) => console.log(err));
	}
	
	
  };

  // Función para alternar el tipo de entrada de contraseña
  const togglePasswordVisibility = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4 className="text-center">Log In</h4>
        {loginError && (
          <span className="text-danger">{loginError}</span> // Muestra el mensaje de error
        )}
		{
			/*
			{loginError && ...} es una forma común y eficiente de realizar un renderizado condicional en React 
			cuando solo deseas mostrar algo cuando una condición es verdadera y no necesitas una alternativa 
			en caso de que sea falsa.
			
			*/
			
			
		}
		
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              onChange={handleChange}
              name="email"
			  autoComplete="off"
              value={values.email}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <input
                type={passwordType} // Utiliza el estado para determinar el tipo de entrada
                placeholder="Enter Password"
                className="form-control rounded-0"
                onChange={handleChange}
				autoComplete="new-password"
                name="password"
                value={values.password}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility} // Llama a la función para alternar la visibilidad
              >
                Show
              </button>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button
            className="btn btn-success w-100 rounded-0"
            type="submit"
			
			
          >
            <strong>Log In</strong>
          </button>
          <p>You are agree to out terms and policies</p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0"
            type="submit"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
