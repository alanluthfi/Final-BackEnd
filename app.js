require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const thumbRoutes = require("./routes/thumbRoute");
const productRoutes = require("./routes/productRoute");
const commentRoutes = require("./routes/commentRoute");

const DB_URL = process.env.DATABASE_URL;

const app = express();
const port = process.env.PORT;

// Apply CORS middleware before defining routes or using other middleware
app.use(cors());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("connected", () => {
  console.log("DB CONNECTED");
});

app.use(express.json());
app.use("/thumb", thumbRoutes);
app.use("/product", productRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});

module.exports = app;
