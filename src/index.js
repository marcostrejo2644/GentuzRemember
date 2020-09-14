const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

// Initializations
app = express();
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
const hbs = exphbs.create({
  defaultLayout: "main.hbs",
  layoutsDir: path.join(app.get("views"), "layouts"),
  extname: ".hbs",
  helpers: {
    select: function (value, options) {
      return options
        .fn(this)
        .split("\n")
        .map(function (v) {
          var t = 'value="' + value + '"';
          return !RegExp(t).test(v)
            ? v
            : v.replace(t, t + ' selected="selected"');
        })
        .join("\n");
    },
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));
// Routes
app.use(require("./routes/notes"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Server Live
app.listen(app.get("port"), () => {
  console.log("We are on localhost:3000");
});
