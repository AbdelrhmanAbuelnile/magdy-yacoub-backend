require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
require('./db')
app.use(cors())
app.use(express.json());
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
app.get("/", (req, res) => res.send("Welcome"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});