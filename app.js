require("dotenv").config();
const Express = require("express");
const db = require("./db");
const sequelize = require('./db'); //julia add
const app = Express();

// Import middlewares as a bundle
const middlewares = require("./middleware/index"); //julia dd /index

// Import controllers as a bundle
const controllers = require("./controllers/index"); //julia add /index

sequelize.sync(); //julia add

// Parse the body of all requests as JSON
app.use(Express.json());
app.use(middlewares.CORS)
app.use("/user", controllers.User);
app.use('/zine', controllers.Zine); //julia add

const resetDatabase = {force:true}
db.authenticate()
// add a resetDatabase inside the db.sync to drop all your tables if needed
// example:  .then(() => db.sync(resetDatabase))
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening intently on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
