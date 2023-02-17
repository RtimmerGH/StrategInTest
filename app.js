/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const { connectDb } = require("./src/services/mongoose");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

connectDb().catch((err) => console.log(err));

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => {
  console.log(`le serveur est lancé à: http://localhost:${port}`);
});
