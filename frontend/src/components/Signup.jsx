import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpValidation from "../SignUpValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [passwordType, setPasswordType] = useState("password"); // Estado para controlar el tipo de entrada de contraseña

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = SignUpValidation(values);
    setErrors(err);
    if (err.name === "" && err.email === "" && err.password === "") {
      axios
        .post("http://localhost:3000/signup", values)
        .then((res) => {
          navigate("/login");
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
        <h4 className="text-center">Sign up</h4>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
              name="name"
              onChange={handleChange}
              value={values.name}
            />
            {errors.name && (
              <span className="text-danger">{errors.name}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
              onChange={handleChange}
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
                name="password"
                onChange={handleChange}
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
            <strong>Sign up</strong>
          </button>
          <p>You are agree to out terms and policies</p>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            type="submit"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
