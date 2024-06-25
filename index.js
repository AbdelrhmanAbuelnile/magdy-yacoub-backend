require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors')
require('./db')
app.use(cors())
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded())
app.use(morgan('tiny'))

const authRoutes = require("./routes/auth")

app.use((err,req,res,next)=>{
	const statusCode = err.statusCode || 500;
	res.status(statusCode).send({
		status:statusCode,
		message: err?.message || 'internal server error',
		errors: err?.errors || []
	})
})

app.use(authRoutes);
app.get("/", (req, res) => res.send((" <h1>Welcome to madgy yacoub backend</h1> <p> <em>signup</em> : <a href='#'>/signup</a></p> ")));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});