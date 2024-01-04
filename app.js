const express = require("express");
const dotenv = require("dotenv")

dotenv.config();

const { default: listEndpoints } = require("list_end_points");

const { connectDB } = require("./src/config/db");

const app = express();
const port =process.env.PORT


app.use(express.json());

app.use((req, res, next) => {
    next(createError.NotFound());
});


listEndpoints(app);

app.listen( port,()=>{
    console.log(`app run on ${port}`)
})

module.exports = app;

