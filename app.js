const express = require("express");
const dotenv = require("dotenv");
const mongoose = require ("mongoose");
const createError = require("http-errors")
const authRouter = require("./src/route/userroute").router;
const errorHandler = require("./src/middleware/errorHandler")



dotenv.config();

const { default: listEndpoints } = require("list_end_points");

const { connectDB } = require("./src/config/db");

const app = express();
const port =process.env.PORT


app.use(express.json());
app.use(errorHandler)


// Routes
app.use("/viviskitchen", authRouter);


 listEndpoints(app);

app.listen( port,()=>{
    console.log(`app is listening on port ${port}...`)
})

// mongodb connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Database Connection Established"))
  .catch((e) => console.log(e.message));


module.exports = app;

