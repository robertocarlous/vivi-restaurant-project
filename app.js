const express = require("express");
const mongoose = require ("mongoose");
const createError = require("http-errors")
const authRouter = require("./src/route/userroute").router;
const blogroute = require("./src/route/blogroute").router;
const eventRouter = require("./src/route/eventroute").router
const contactRouter = require("./src/route/contactroute").router
const categoryRouter = require("./src/route/categoryroute").router
const errorHandler = require("./src/middleware/errorHandler")


const app = express();
const port =process.env.PORT


const { default: listEndpoints } = require("list_end_points");


app.use(express.json());
app.use(errorHandler)


// Routes
app.use("/viviskitchen/signup", authRouter);
app.use("/viviskitchen/blogposts", blogroute);
app.use("/viviskitchen/event", eventRouter);
app.use("/viviskitchen/contact", contactRouter);
app.use("/viviskitchen/category", categoryRouter)


 listEndpoints(app);

app.listen( port,()=>{
    console.log(`app is listening on port ${port}...`)
})

// mongodb connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Database Connection Established!"))
  .catch((e) => console.log(e.message));


module.exports = app;

