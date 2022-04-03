const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);
console.log("Server on port 3000");
