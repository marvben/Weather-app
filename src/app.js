const path = require("path");
require("dotenv").config({ path: __dirname + "/./../.env" });
const express = require("express");
const routes = require("../routes/routes.js");
const hbs = require("hbs");

const app = express();

//setup for  static files
app.use(express.static(path.join(__dirname, "../public")));

//setup for view engine config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views")); //targeting hbs page files;
hbs.registerPartials(path.join(__dirname, "../templates/partials")); //targeting hbs partials;

app.use(express.json());
app.use(routes);

// app.use((req, res, next) => {
//   res.status(404).render("404");
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
const port = process.env.PORT || 443;
app.listen(port, function () {
  console.log("Listening on port 3000");
});
