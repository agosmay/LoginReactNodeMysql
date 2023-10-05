const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const salt =10;




const app = express();
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
	host : "localhost",
	user: "root",
	password : "",
	database : "signup"
})


app.get("/", (req,res)=> {
	res.send("Hi from server");
	
	
})

app.post("/signup", (req,res)=> {
	const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"
	
	
	const password = req.body.password
	
	bcrypt.hash(password.toString(), salt, (err,hash)=> {
		
		if(err) {
			console.log(err)
		}
		
		const values = [
		req.body.name,
		req.body.email,
		hash
	]
	db.query(sql, [values] , (err,data) => {
		if(err) {
			return res.json("Error");
		}
		return res.json(data);
	})
	})
})



app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      // El usuario fue encontrado en la base de datos.
      const hashedPassword = data[0].password; // Debería ser el hash almacenado en la base de datos.

      // Compara la contraseña proporcionada con el hash almacenado en la base de datos.
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          return res.json("Error");
        }
        if (result) {
          // Contraseña válida, permite el acceso.
          return res.json("Success");
        } else {
          // Contraseña incorrecta.
          return res.json("Failed - Password incorrect");
        }
      });
    } else {
      // Usuario no encontrado.
      return res.json("Failed - User not found");
    }
  });
});




app.listen(3000, ()=> {
	console.log("Server listening on port");
	
})



/*compare q no haya usuario repetido en la base de datos


logout desde el backend

agregarle un ratio al terminos y condiciones , poner un true or false en la base de datos ?


chequear por mail q no se repita el usuario en la base de datos*/