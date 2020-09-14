const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/gentuz-remember", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((db) => console.log("DB is Connect"))
  .catch((er) => console.log(er));
